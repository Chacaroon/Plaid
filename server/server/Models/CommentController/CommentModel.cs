using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.CommentController
{
    public class CommentModel
    {
        public int Id { get; set; }
        public int AuthorId { get; set; }
        public string AuthorName { get; set; }
        public string Content { get; set; }
    }
}
