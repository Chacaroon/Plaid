using Domain;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace BLL.Interfaces
{
    public interface ITokenService
    {
        public string GenerateJwtToken(User user);
        public string GenerateRefreshToken(string accessToken);
        public JwtSecurityToken GetCurrentToken(string token);

    }
}
