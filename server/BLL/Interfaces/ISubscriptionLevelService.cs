using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Interfaces
{
    public interface ISubscriptionLevelService
    {
        void AddSubLevel(float cost, string name, User creator);
        SubscriptionLevel GetSubscriptionLevelById(int id);
        void Delete(int id);
        IEnumerable<SubscriptionLevel> GetAllByCreatorId(int creatorId);
    }
}
