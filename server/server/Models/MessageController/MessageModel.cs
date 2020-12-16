using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.MessageController
{
    public class MessageModel
    {
        public int SenderId { get; set; }
        public int RecipientId { get; set; }
        public DateTime Date { get; set; }
        public string Content { get; set; }
    }
}
