using BLL.Interfaces;
using DAL.Interfaces;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public void SendMessage(User sender, User recipient, DateTime dateTime, string content)
        {
            var message = new Message()
            {
                Sender = sender,
                Recipient = recipient,
                Date = dateTime,
                Content = content
            };

            _messageRepository.Add(message);
        }

        public IEnumerable<User> GetAllRecipients(User user)
        {
            var recipients = _messageRepository.GetAll(m => m.SenderId == user.Id).Select(m => m.Recipient).Distinct();
            var senders = _messageRepository.GetAll(m => m.RecipientId == user.Id).Select(m => m.Sender).Distinct();

            return recipients.Union(senders).Distinct();
        }

        public IEnumerable<Message> GetAllUserMessages(User user)
        {
            return _messageRepository.GetAll(m => m.SenderId == user.Id || m.RecipientId == user.Id);
        }
    }
}
