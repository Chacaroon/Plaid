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
    public class CommentRepository : BaseRepository<Comment>, ICommentRepository
    {
        protected override IQueryable<Comment> _baseQuery => _context.Set<Comment>()
            .Include(x => x.Author);

        public CommentRepository(ApplicationContext context)
           : base(context)
        {

        }
    }
}
