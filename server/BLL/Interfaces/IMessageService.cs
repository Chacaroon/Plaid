﻿using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Interfaces
{
    public interface IMessageService
    {
        void SendMessage(User sender, User recipient, DateTime dateTime, string content);
        IEnumerable<User> GetAllRecipients(User user);
        IEnumerable<Message> GetAllUserMessages(User user);
    }
}