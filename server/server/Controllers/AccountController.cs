using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
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

            return Ok(new TokenModel()
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            });
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel request)
        {
            var user = AuthenticateUser(request.Email, request.Password);

            if (user != null)
            {
                var accessToken = _tokenService.GenerateJwtToken(user);
                var refreshToken = _tokenService.GenerateRefreshToken(accessToken);

                return Ok(new TokenModel()
                {
                    AccessToken = accessToken,
                    RefreshToken = refreshToken
                });
            }

            return Unauthorized();
        }

        private User AuthenticateUser(string email, string password)
        {
            return _userRepository.GetAll(x => x.Email == email && x.Password == password)
                .SingleOrDefault();
        }
    }
}