using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Interfaces
{
    public interface ISubscriptionService
    {
        void AddSubscription(SubscriptionLevel subLevel, User user);
    }
}
