using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
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

        public AccountController(IUserRepository userRepository,
            IOptions<AuthOptions> authOpions,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _authOpions = authOpions;
            _mapper = mapper;
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
            var token = GenerateJWT(user);

            return Ok(new TokenModel()
            {
                AccessToken = token
            });
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel request)
        {
            var user = AuthenticateUser(request.Email, request.Password);

            if (user != null)
            {
                var token = GenerateJWT(user);

                return Ok(new TokenModel()
                {
                    AccessToken = token
                });
            }

            return Unauthorized();
        }

        private User AuthenticateUser(string email, string password)
        {
            return _userRepository.GetAll(x => x.Email == email && x.Password == password)
                .SingleOrDefault();
        }

        private string GenerateJWT(User account)
        {
            var authParams = _authOpions.Value;
            var securityKey = authParams.GetSymmetricSecurityKey();
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Email, account.Email),
                new Claim(JwtRegisteredClaimNames.Sub, account.Id.ToString())
            };

            foreach (var role in Enum.GetValues(typeof(RoleEnum)).Cast<RoleEnum>())
            {
                if (account.HasRole(role))
                {
                    claims.Add(new Claim("role", role.ToString()));
                }
            }

            var token = new JwtSecurityToken(authParams.Issuer,
                authParams.Audience,
                claims,
                expires: DateTime.Now.AddSeconds(authParams.TokenLifeTime),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}