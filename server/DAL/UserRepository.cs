using DAL.Contexts;
using DAL.Interfaces;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DAL
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(ApplicationContext context)
            : base(context)
        {

        }

        public void UpdateBIO(User user, string bio)
        {
            var userFromDB =_context.Users.Where(x => x.Email == user.Email)
                .FirstOrDefault();
            userFromDB.Bio = bio;

            _context.SaveChanges();
        }
        
    }
}

