using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class Subscription: BaseEntity
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int SubscriptionLevelId { get; set; }
        public SubscriptionLevel SubscriptionLevel { get; set; }
    }
}
