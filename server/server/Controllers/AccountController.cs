using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Web.Helpers;
using AutoMapper;
using BLL.Interfaces;
using Common;
using DAL.Interfaces;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Server.Models;

namespace server.Controllers
{
    [Authorize]
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserService _userService;
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        private readonly IOptions<AuthOptions> _authOpions;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;

        public AccountController(IUserRepository userRepository,
            IUserService userService,
            IRefreshTokenRepository refreshTokenRepository,
            IOptions<AuthOptions> authOpions,
            IMapper mapper,
            ITokenService tokenService)
        {
            _userRepository = userRepository;
            _userService = userService;
            _refreshTokenRepository = refreshTokenRepository;
            _authOpions = authOpions;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        [HttpGet("current")]
        public IActionResult GetCurrentUser()
        {
            if (!(Request.Cookies.TryGetValue("accessToken", out var requestAccessToken)))
            {
                return Unauthorized(new ErrorMessageModel()
                {
                    ErrorMessage = "Token is not valid"
                });
            }

            var user = _userService.GetCurrentUser(_tokenService.GetCurrentToken(requestAccessToken));

            return Ok(_mapper.Map<User, UserModel>(user));
        }

        [HttpGet("")]
        public IActionResult Test()
        {
            return Ok(new
            {
                str = "All fine"
            });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel register)
        {
            if (_userService.IsEmailTaken(register.Email))
            {
                return BadRequest(new ErrorMessageModel()
                {
                    ErrorMessage = "Email is taken"
                });
            }

            if (_userService.IsTagTaken(register.Tag))
            {
                return BadRequest(new ErrorMessageModel()
                {
                    ErrorMessage = "Tag is taken"
                });
            }

            register.Password = Crypto.HashPassword(register.Password);
            var user = _mapper.Map<User>(register);
            _userRepository.Add(user);
            var accessToken = _tokenService.GenerateJwtToken(user);
            var refreshToken = _tokenService.GenerateRefreshToken(accessToken);
            _refreshTokenRepository.Add(new RefreshToken() { Token = refreshToken, User = user });

            Response.Cookies.Append("accessToken", accessToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
            Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel request)
        {
            var user = _userService.AuthenticateUser(request.Email, request.Password);

            if (user == null)
            {
                return Unauthorized(new ErrorMessageModel()
                {
                    ErrorMessage = "login or password are incorrect"
                });
            }

            var accessToken = _tokenService.GenerateJwtToken(user);
            var refreshToken = _tokenService.GenerateRefreshToken(accessToken);
            _refreshTokenRepository.Add(new RefreshToken() { Token = refreshToken, User = user });

            Response.Cookies.Append("accessToken", accessToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
            Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("refresh-token")]
        public IActionResult UpdateTokens()
        {
            if (!(Request.Cookies.TryGetValue("accessToken", out var requestAccessToken) &&
                Request.Cookies.TryGetValue("refreshToken", out var requestRefreshToken)))
            {
                return BadRequest(new ErrorMessageModel()
                {
                    ErrorMessage = "token was not found"
                });
            }

            if (_tokenService.GenerateRefreshToken(requestAccessToken) != requestRefreshToken)
            {
                return BadRequest(new ErrorMessageModel()
                {
                    ErrorMessage = "access token and refresh token are not valid"
                });
            }

            var token = new JwtSecurityTokenHandler().ReadToken(requestAccessToken) as JwtSecurityToken;
            var user = _userRepository.GetById(Convert.ToInt32(token.Claims.First(claim => claim.Type == "sub").Value));
            var accessToken = _tokenService.GenerateJwtToken(user);
            var refreshToken = _tokenService.GenerateRefreshToken(accessToken);

            Response.Cookies.Append("accessToken", accessToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
            Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });


            return Ok();
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            if (!Request.Cookies.TryGetValue("refreshToken", out var requestRefreshToken))
            {
                return BadRequest(new ErrorMessageModel()
                {
                    ErrorMessage = "token was not found"
                });
            }

            Response.Cookies.Delete("accessToken");
            Response.Cookies.Delete("refreshToken");
            _tokenService.CleanToken(requestRefreshToken);

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("account-is-email-taken")]
        public bool AccountIsEmailTaken([FromBody] string email)
        {
            return _userService.IsEmailTaken(email);
        }

        [AllowAnonymous]
        [HttpPost("account-is-tag-taken")]
        public bool IsTagTaken([FromBody] string tag)
        {
            return _userService.IsTagTaken(tag);
        }

        [HttpPost("change-bio")]
        public IActionResult ChangeBio([FromBody] ChangeBIOModel bio)
        {
            Request.Cookies.TryGetValue("accessToken", out var requestAccessToken);
            var user = _userService.GetCurrentUser(_tokenService.GetCurrentToken(requestAccessToken));
            _userService.ChangeBio(user, bio.BIO);

            return Ok();
        }
    }
}