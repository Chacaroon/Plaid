using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class SubscriptionLevel : BaseEntity
    {
        public string Name { get; set; }
        public float Cost { get; set; }
        public User Creator { get; set; }
        public IEnumerable<Subscription> Subscriptions { get; set; }
        public IEnumerable<Post> Posts { get; set; }

        public SubscriptionLevel()
        {
            Subscriptions = new List<Subscription>();
            Posts = new List<Post>();
        }

    }
}
