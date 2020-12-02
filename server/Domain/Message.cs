using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class Message : BaseEntity
    {
        public int SenderId { get; set; }
        public User Sender { get; set; }
        public int RecipientId{ get; set; }
        public User Recipient { get; set; }
        public string Content { get; set; }
    }
}
