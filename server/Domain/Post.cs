using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class Post: BaseEntity
    {
        public string Content { get; set; }
        public User User { get; set; }
        public SubscriptionLevel SubscriptionLevel { get; set; }
        public ICollection<Comment> PostComments { get; set; }

        public Post()
        {
            PostComments = new List<Comment>();
        }
    }
}
