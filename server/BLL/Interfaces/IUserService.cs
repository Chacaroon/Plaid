using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Interfaces
{
    public interface IUserService
    {
        bool IsEmailTaken(string email);
        bool IsTagTaken(string tag);
        User AuthenticateUser(string email, string password);
    }
}
