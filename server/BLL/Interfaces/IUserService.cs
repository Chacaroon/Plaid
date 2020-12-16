using Domain;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace BLL.Interfaces
{
    public interface IUserService
    {
        bool IsEmailTaken(string email);
        bool IsTagTaken(string tag);
        User AuthenticateUser(string email, string password);
        User GetCurrentUser(JwtSecurityToken token);
        public User GetCurrentUserById(int id);
        void ChangeBio(User user, string bio);
        IEnumerable<User> GetAllByCategory(string category);
        IEnumerable<User> Search(string name);
    }
}
