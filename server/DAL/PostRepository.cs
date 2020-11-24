using DAL.Contexts;
using DAL.Interfaces;
using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL
{
    public class PostRepository : BaseRepository<Post>, IPostRepository
    {
        public PostRepository(ApplicationContext context)
            : base(context)
        {

        }
    }
}
