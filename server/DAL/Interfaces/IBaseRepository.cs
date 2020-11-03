using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace DAL.Interfaces
{
    public interface IBaseRepository<T> : IDisposable
    {
        public IEnumerable<T> GetAll();
        public IEnumerable<T> GetAll(Expression<Predicate<T>> predicate);

    }
}
