using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class Post
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public User User { get; set; }
        public ICollection<Comment> PostComments { get; set; }

        public Post()
        {
            PostComments = new List<Comment>();
        }
    }
}
