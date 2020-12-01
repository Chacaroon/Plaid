using Common.Enums;
using Common.Interfaces;
using System.Collections.Generic;

namespace Domain
{
    public class User : BaseEntity, IUserRoles
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Tag { get; set; }
        public string Bio { get; set; }
        public string HashPassword { get; set; }
        public RoleEnum Roles { get; set; }
        public IEnumerable<RefreshToken> RefreshTokens { get; set; }
        public IEnumerable<Post> Posts { get; set; }
        public IEnumerable<Subscription> Subscriptions { get; set; }
        public IEnumerable<SubscriptionLevel> SubscriptionLevels { get; set; }


        public User()
        {
            RefreshTokens = new List<RefreshToken>();
            Posts = new List<Post>();
            Subscriptions = new List<Subscription>();
        }
    }
}
