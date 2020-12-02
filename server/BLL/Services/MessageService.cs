using BLL.Interfaces;
using DAL.Interfaces;
using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Services
{
    public class MessageService : IMessageService
    {
        private readonly IMessageRepository _messageRepository;

        public MessageService(IMessageRepository messageRepository)
        {
            _messageRepository = messageRepository;
        }

        public void SendMessage(User sender, User recipient, string content)
        {
            var message = new Message()
            {
                Sender = sender,
                Recipient = recipient,
                Content = content
            };

            _messageRepository.Add(message);
        }
    }
}
