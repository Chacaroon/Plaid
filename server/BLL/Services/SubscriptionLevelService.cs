using BLL.Interfaces;
using DAL.Interfaces;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace BLL.Services
{
    public class SubscriptionLevelService : ISubscriptionLevelService
    {
        private readonly ISubscriptionLevelRepository _subscriptionsLevelRepository;

        public SubscriptionLevelService(ISubscriptionLevelRepository subscriptionsLevelRepository)
        {
            _subscriptionsLevelRepository = subscriptionsLevelRepository;
        }
        public void AddSubLevel(float cost, string name, User creator)
        {
            var subLevel = new SubscriptionLevel()
            {
                Cost = cost,
                Name = name,
                Creator = creator
            };
            _subscriptionsLevelRepository.Add(subLevel);
        }

        public SubscriptionLevel GetSubscriptionLevelById(int id)
        {
            return _subscriptionsLevelRepository.GetAll(s => s.Id == id).Include(s => s.Creator).SingleOrDefault();
        }

        public void Delete(int id)
        {
            var sub = _subscriptionsLevelRepository.GetById(id);
            _subscriptionsLevelRepository.Delete(sub);
        }

        public IEnumerable<SubscriptionLevel> GetAllByCreatorId(int creatorId)
        {
            return _subscriptionsLevelRepository.GetAll(s => s.Creator.Id == creatorId);
        }
    }
}
