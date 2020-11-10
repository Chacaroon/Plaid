using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Interfaces;
using Common;
using Common.Enums;
using Common.Extensions;
using DAL;
using DAL.Interfaces;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Server.Models;

namespace server.Controllers
{
    [Authorize]
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IOptions<AuthOptions> _authOpions;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;

        public AccountController(IUserRepository userRepository,
            IOptions<AuthOptions> authOpions,
            IMapper mapper,
            ITokenService tokenService)
        {
            _userRepository = userRepository;
            _authOpions = authOpions;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        [HttpGet("current")]
        public IActionResult GetCurrentUser()
        {
            if (!(Request.Cookies.TryGetValue("accessToken", out var requestAccessToken)))
            {
                return BadRequest();
            }

            var token = new JwtSecurityTokenHandler().ReadToken(requestAccessToken) as JwtSecurityToken;
            var user = _userRepository.GetById(Convert.ToInt32(token.Claims.First(claim => claim.Type == "sub").Value));

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
            var user = _mapper.Map<User>(register);
            _userRepository.Add(user);
            var accessToken = _tokenService.GenerateJwtToken(user);
            var refreshToken = _tokenService.GenerateRefreshToken(accessToken);

            Response.Cookies.Append("accessToken", accessToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
            Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel request)
        {
            var user = AuthenticateUser(request.Email, request.Password);

            if (user == null)
            {
                return Unauthorized();
            }

            var accessToken = _tokenService.GenerateJwtToken(user);
            var refreshToken = _tokenService.GenerateRefreshToken(accessToken);

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
                return BadRequest();
            }

            if (_tokenService.GenerateRefreshToken(requestAccessToken) != requestRefreshToken)
            {
                return Unauthorized();
            }

            var token = new JwtSecurityTokenHandler().ReadToken(requestAccessToken) as JwtSecurityToken;
            var user = _userRepository.GetById(Convert.ToInt32(token.Claims.First(claim => claim.Type == "sub").Value));
            var accessToken = _tokenService.GenerateJwtToken(user);
            var refreshToken = _tokenService.GenerateRefreshToken(accessToken);

            Response.Cookies.Append("accessToken", accessToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
            Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });


            return Ok();
        }

        private User AuthenticateUser(string email, string password)
        {
            return _userRepository.GetAll(x => x.Email == email && x.Password == password)
                .SingleOrDefault();
        }
    }
}