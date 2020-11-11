﻿using System;
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
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        private readonly IOptions<AuthOptions> _authOpions;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;

        public AccountController(IUserRepository userRepository,
            IRefreshTokenRepository refreshTokenRepository,
            IOptions<AuthOptions> authOpions,
            IMapper mapper,
            ITokenService tokenService)
        {
            _userRepository = userRepository;
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
            var user = AuthenticateUser(request.Email, request.Password);

            if (user == null)
            {
                return Unauthorized();
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

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            if (!Request.Cookies.TryGetValue("refreshToken", out var requestRefreshToken))
            {
                return BadRequest();
            }

            Response.Cookies.Delete("accessToken");
            Response.Cookies.Delete("refreshToken");

            //TODO: FIX
            var token = _refreshTokenRepository.GetAll()
                .Where(x => x.Token == requestRefreshToken)
                .First();

            _refreshTokenRepository.Delete(token);

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("account-is-email-taken")]
        public bool IsEmailTaken([FromBody] string email)
        {
            var user = _userRepository.GetAll(x => x.Email == email);
            return user != null;
        }

        [AllowAnonymous]
        [HttpPost("account-is-tag-taken")]
        public bool IsTagTaken([FromBody] string tag)
        {
            var user = _userRepository.GetAll(x => x.Tag == tag);
            return user != null;
        }

        private User AuthenticateUser(string email, string password)
        {
            var user = _userRepository.GetAll(x => x.Email == email)
                .SingleOrDefault();
            return Crypto.VerifyHashedPassword(user.HashPassword, password) ? user : null;
        }
    }
}