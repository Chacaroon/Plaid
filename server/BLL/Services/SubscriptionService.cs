using BLL.Interfaces;
using DAL.Interfaces;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL.Services
{
    public class SubscriptionService : ISubscriptionService
    {
        private readonly ISubscriptionRepository _subscriptionRepository;
        private readonly IPostRepository _postRepository;

        public SubscriptionService(ISubscriptionRepository subscriptionRepository,
            IPostRepository postRepository)
        {
            _subscriptionRepository = subscriptionRepository;
            _postRepository = postRepository;
        }
        public void AddSubscription(SubscriptionLevel subLevel, User user)
        {
            var existingSub = _subscriptionRepository.GetAll().FirstOrDefault(s => s.SubscriptionLevel.Creator == subLevel.Creator);
            if (existingSub != null)
            {
                _subscriptionRepository.Delete(existingSub);
            }
            _subscriptionRepository.Add(new Subscription { SubscriptionLevel = subLevel, User = user });
        }

        public bool IsExist(int id)
        {
            return _postRepository.GetAll(p => p.SubscriptionLevel.Id == id) != null;
        }
    }
}
