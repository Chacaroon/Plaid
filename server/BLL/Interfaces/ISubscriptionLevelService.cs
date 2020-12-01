using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Interfaces
{
    public interface ISubscriptionLevelService
    {
        void AddSubLevel(float cost, User creator);
    }
}
