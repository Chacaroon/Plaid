using DAL.Contexts;
using DAL.Interfaces;
using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DAL
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        protected override IQueryable<User> _baseQuery => _context.Set<User>()
            .Include(x => x.Posts);
        public UserRepository(ApplicationContext context)
            : base(context)
        {

        }

        public void UpdateBIO(User user, string bio)
        {
            var userFromDB = _context.Users.Where(x => x.Email == user.Email)
                .FirstOrDefault();
            userFromDB.Bio = bio;

            _context.SaveChanges();
        }

        public IEnumerable<User> Search(string name)
        {
            var pattern = "%" + name + "%";
            return _baseQuery.Where(u => EF.Functions.Like(u.Name, pattern) 
                && u.Roles.HasFlag(Common.Enums.RoleEnum.Creator));
        }

    }
}

