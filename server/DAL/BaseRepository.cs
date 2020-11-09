using DAL.Contexts;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace DAL
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected readonly ApplicationContext _context;

        public BaseRepository(ApplicationContext context)
        {
            _context = context;
        }

        public virtual void Add(T item)
        {
            _context.Add(item);
            _context.SaveChanges();
        }

        public virtual IQueryable<T> GetAll()
        {
            return _context.Set<T>();
        }

        public virtual IQueryable<T> GetAll(Expression<Func<T,bool>> predicate)
        {
            return GetAll().Where(predicate);
        }

        public virtual T GetById(int id)
        {
            return _context.Set<T>().Find(id);
        }
    }
}
