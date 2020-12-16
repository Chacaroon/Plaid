using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Models.AccountController;
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
        private readonly ITokenService _tokenService;

        public MessageController(IUserService userService,
            IMessageService messageService,
            ITokenService tokenService)
        {
            _userService = userService;
            _messageService = messageService;
            _tokenService = tokenService;
        }

        [HttpPost]
        public IActionResult SendMessage([FromBody] MessageModel model)
        {
            var sender = _userService.GetCurrentUserById(model.SenderId);
            var recipient = _userService.GetCurrentUserById(model.RecipientId);

            _messageService.SendMessage(sender, recipient, model.Date, model.Content);

            return Ok();
        }

        [HttpGet("user/{id}")]
        public IActionResult GetAllMessages([FromRoute] int id)
        {
            var user = _userService.GetCurrentUserById(id);
            var messages = _messageService.GetAllUserMessages(user);

            return Ok(messages);
        }

        //Get all users that we have messages with
        [HttpGet("recipients")]
        public IActionResult GetRecipients()
        {

            if (!(Request.Cookies.TryGetValue("accessToken", out var requestAccessToken)))
            {
                return Unauthorized(new ErrorMessageModel()
                {
                    ErrorMessage = "Token is not valid"
                });
            }

            var user = _userService.GetCurrentUser(_tokenService.GetCurrentToken(requestAccessToken));

            return Ok(_messageService.GetAllRecipients(user));
        }
    }
}
