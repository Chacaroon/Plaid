using BLL.Interfaces;
using Common;
using Common.Enums;
using Common.Extensions;
using DAL.Interfaces;
using Domain;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Unicode;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class TokenService : ITokenService
    {
        private readonly IOptions<AuthOptions> _authOpions;
        private readonly IRefreshTokenRepository _refreshTokenRepository;

        public TokenService(IOptions<AuthOptions> authOpions,
            IRefreshTokenRepository refreshTokenRepository)
        {
            _authOpions = authOpions;
            _refreshTokenRepository = refreshTokenRepository;
        }


        public string GenerateJwtToken(User user)
        {
            var authParams = _authOpions.Value;
            var securityKey = authParams.GetSymmetricSecurityKey();
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString())
            };

            claims.AddRange(Enum.GetValues(typeof(RoleEnum)).Cast<RoleEnum>()
                .Where(role => user.HasRole(role))
                .Select(role => new Claim("role", role.ToString())));

            var token = new JwtSecurityToken(authParams.Issuer,
                authParams.Audience,
                claims,
                expires: DateTime.Now.AddSeconds(authParams.TokenLifeTime),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string GenerateRefreshToken(string accessToken)
        {
            var thirdPartOfToken = Encoding.ASCII.GetBytes(accessToken.Split(".").Last());
            byte[] secretKey = Encoding.ASCII.GetBytes(_authOpions.Value.RefreshSecretKey);
            using var hashAlgoritm = new HMACSHA256(secretKey);
            var computedHash = hashAlgoritm.ComputeHash(thirdPartOfToken);
            return Convert.ToBase64String(computedHash, 0, computedHash.Length);
        }

        public JwtSecurityToken GetCurrentToken(string token)
        {
            return new JwtSecurityTokenHandler().ReadToken(token) as JwtSecurityToken;
        }
        public void CleanToken(string tokenStr)
        {
            var token = _refreshTokenRepository.GetAll()
               .Where(x => x.Token == tokenStr)
               .First();

            _refreshTokenRepository.Delete(token);
        }
    }
}
