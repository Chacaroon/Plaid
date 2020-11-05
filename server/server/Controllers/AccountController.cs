using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Common;
using DAL;
using DAL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Server.Models;

namespace server.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IOptions<AuthOptions> _authOpions;
        private readonly IMapper _mapper;

        public AccountController(IAccountRepository accountRepository,
            IOptions<AuthOptions> authOpions,
            IMapper mapper)
        {
            _accountRepository = accountRepository;
            _authOpions = authOpions;
            _mapper = mapper;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody]Login request)
        {
            var user = AuthenticateUser(request.Email, request.Password);

            if (user != null)
            {
                var token = GenerateJWT(user);

                return Ok(new
                {
                    access_token = token
                });
            }

            return Unauthorized();
        }

        private UserModel AuthenticateUser(string email, string password)
        {
            return _mapper.Map<UserModel>(_accountRepository.GetAll().FirstOrDefault(a => a.Email == email && a.Password == password));
        }

        private string GenerateJWT(UserModel account)
        {
            var authParams = _authOpions.Value;
            var securityKey = authParams.GetSymmetricSecurityKey();
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Email, account.Email),
                new Claim(JwtRegisteredClaimNames.Sub, account.Id.ToString())
            };

            foreach (var role in account.Roles)
            {
                claims.Add(new Claim("role", role.ToString()));
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