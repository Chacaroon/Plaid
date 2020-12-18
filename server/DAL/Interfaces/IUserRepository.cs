using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Interfaces
{
    public interface IUserRepository : IBaseRepository<User>
    {
        void UpdateBIO(User user, string bio);
        IEnumerable<User> Search(string name);
    }
}
