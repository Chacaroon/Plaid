using DAL.Contexts;
using DAL.Interfaces;
using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL
{
    public class SubscriptionLevelRepository : BaseRepository<SubscriptionLevel>, ISubscriptionLevelRepository
    {
        protected override IQueryable<SubscriptionLevel> _baseQuery => _context.Set<SubscriptionLevel>()
            .Include(s => s.Creator);
        public SubscriptionLevelRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
