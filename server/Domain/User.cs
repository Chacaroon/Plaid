using Common.Enums;
using Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Web.Helpers;

namespace Domain
{
    public class User : IUserRoles
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Tag { get; set; }
        public string Bio { get; set; }
        private string hashPassword;
        public string Password 
        {
            get { return hashPassword; }
            set
            {
                hashPassword = Crypto.HashPassword(value); 
            } 
        }
        public RoleEnum Roles { get; set; }
        public ICollection<RefreshToken> RefreshTokens { get; set; }

        public User()
        {
            RefreshTokens = new List<RefreshToken>();
        }
    }
}
