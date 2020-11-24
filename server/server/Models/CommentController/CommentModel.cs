using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.CommentController
{
    public class CommentModel
    {
        public string Content { get; set; }
        public int PostId { get; set; }
    }
}
