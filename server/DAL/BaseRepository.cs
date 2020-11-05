using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace DAL
{
    public class BaseRepository<T> : IBaseRepository<T>
    {
        public void Dispose()
        {
        }

        public IEnumerable<T> GetAll()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<T> GetAll(Expression<Predicate<T>> predicate)
        {
            throw new NotImplementedException();
        }
    }
}
