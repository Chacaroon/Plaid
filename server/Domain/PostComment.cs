using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class PostComment
    {
        public int Id { get; set; }
        public string Comment { get; set; }
        public int UserId { get; set; }
        public Post Post { get; set; }
    }
}
