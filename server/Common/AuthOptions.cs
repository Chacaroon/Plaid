using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

namespace Common
{
    public class AuthOptions
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string AccessSecretKey { get; set; }
        public string RefreshSecretKey { get; set; }
        public int TokenLifeTime { get; set; }
        public SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(AccessSecretKey));
        }
    }
}
