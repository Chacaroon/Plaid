using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Models.MessageController;

namespace Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMessageService _messageService;

        public MessageController(IUserService userService,
            IMessageService messageService)
        {
            _userService = userService;
            _messageService = messageService;
        }

        [HttpPost]
        public IActionResult SendMessage([FromBody] MessageModel model)
        {
            var sender = _userService.GetCurrentUserById(model.SenderId);
            var recipient = _userService.GetCurrentUserById(model.RecipientId);

            _messageService.SendMessage(sender, recipient, model.Date, model.Content);

            return Ok();
        }
    }
}
