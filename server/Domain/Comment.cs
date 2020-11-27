using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class Comment: BaseEntity
    {
        public string Content { get; set; }
        public int AuthorId { get; set; }
        public User Author { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }

    }
}
