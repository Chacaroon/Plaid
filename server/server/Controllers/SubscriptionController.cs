using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Models.AccountController;
using Server.Models.SubController;

namespace Server.Controllers
{
    [Route("api/sub-levels")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly ISubscriptionLevelService _subscriptionLevelService;
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;
        private readonly ISubscriptionService _subscriptionService;

        public SubscriptionController(ISubscriptionLevelService subscriptionLevelService,
            IUserService userService,
            ITokenService tokenService,
            ISubscriptionService subscriptionService)
        {
            _subscriptionLevelService = subscriptionLevelService;
            _userService = userService;
            _tokenService = tokenService;
            _subscriptionService = subscriptionService;
        }

        [HttpGet("{id}")]
        public IActionResult GetSubLevel([FromQuery] SubLevelIdModel model)
        {
            var subs =_subscriptionLevelService.GetAllByCreatorId(model.Id);

            return Ok(subs);
        }

        [Authorize(Roles = "Creator")]
        [HttpPost]
        public IActionResult AddSubscriptionLevel([FromBody]SubLevelModel model)
        {
            Request.Cookies.TryGetValue("accessToken", out var requestAccessToken);
            var user = _userService.GetCurrentUser(_tokenService.GetCurrentToken(requestAccessToken));
            _subscriptionLevelService.AddSubLevel(model.Cost, user);

            return Ok();
        }


        [Authorize(Roles = "Creator")]
        [HttpPost("subscription")]
        public IActionResult AddSubscription([FromBody] SubLevelCreatorIdModel model)
        {
           
            var user = _userService.GetCurrentUserById(model.CreatorId);

            if (user == null)
            {
                return BadRequest(new ErrorMessageModel()
                {
                    ErrorMessage = "User are not creator or does not exist"
                });
            }

            var subLevel = _subscriptionLevelService.GetSubscriptionLevelById(model.SubLevelId);

            if (subLevel == null)
            {
                return BadRequest(new ErrorMessageModel()
                {
                    ErrorMessage = "SubLevel does not exist"
                });
            }

            _subscriptionService.AddSubscription(subLevel, user);

            return Ok();
        }

        [Authorize(Roles = "Creator")]
        [HttpGet("delete/{id}")]
        public IActionResult DeleteSubLevel([FromRoute] SubLevelIdModel model)
        {
            if (_subscriptionService.IsExist(model.Id))
            {
                return BadRequest(new ErrorMessageModel()
                {
                    ErrorMessage = "Can not delete Subscription level"
                });
            }

            _subscriptionLevelService.Delete(model.Id);

            return Ok();
        }
    }
}
