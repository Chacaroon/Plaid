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
    public class AccountRepository : BaseRepository<User>, IAccountRepository
    {
        private readonly ApplicationContext _context;

        public AccountRepository(ApplicationContext context)
        {
            _context = context;
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        public IEnumerable<User> GetAll(Expression<Predicate<User>> predicate)
        {
            throw new NotImplementedException();
        }
    }
}
