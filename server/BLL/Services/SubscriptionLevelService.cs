using BLL.Interfaces;
using DAL.Interfaces;
using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Services
{
    public class SubscriptionLevelService : ISubscriptionLevelService
    {
        private readonly ISubscriptionLevelRepository _subscriptionsLevelRepository;

        public SubscriptionLevelService(ISubscriptionLevelRepository subscriptionsLevelRepository)
        {
            _subscriptionsLevelRepository = subscriptionsLevelRepository;
        }
        public void AddSubLevel(float cost, User creator)
        {
            var subLevel = new SubscriptionLevel()
            {
                Cost = cost,
                Creator = creator
            };
            _subscriptionsLevelRepository.Add(subLevel);
        }

        public SubscriptionLevel GetSubscriptionLevelById(int id)
        {
            return _subscriptionsLevelRepository.GetById(id);
        }
    }
}
