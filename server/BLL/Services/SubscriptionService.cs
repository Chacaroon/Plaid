using BLL.Interfaces;
using DAL.Interfaces;
using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Services
{
    public class SubscriptionService : ISubscriptionService
    {
        private readonly ISubscriptionRepository _subscriptionRepository;

        public SubscriptionService(ISubscriptionRepository subscriptionRepository)
        {
            _subscriptionRepository = subscriptionRepository;
        }
        public void AddSubscription(SubscriptionLevel subLevel, User user)
        {
            var sub = new Subscription()
            {
                SubscriptionLevel = subLevel,
                User = user
            };
            _subscriptionRepository.Add(sub);
        }
    }
}
