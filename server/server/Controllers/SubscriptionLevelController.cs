using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Models.SubController;

namespace Server.Controllers
{
    [Route("api/sub-levels")]
    [ApiController]
    public class SubscriptionLevelController : ControllerBase
    {
        private readonly ISubscriptionLevelService _subscriptionLevelService;
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;

        public SubscriptionLevelController(ISubscriptionLevelService subscriptionLevelService,
            IUserService userService,
            ITokenService tokenService)
        {
            _subscriptionLevelService = subscriptionLevelService;
            _userService = userService;
            _tokenService = tokenService;
        }

        [Authorize(Roles = "Creator")]
        [HttpPost]
        public IActionResult AddSubscriptionLevel([FromBody]SubLevel model)
        {
            Request.Cookies.TryGetValue("accessToken", out var requestAccessToken);
            var user = _userService.GetCurrentUser(_tokenService.GetCurrentToken(requestAccessToken));
            _subscriptionLevelService.AddSubLevel(model.Cost, user);

            return Ok();
        }
    }
}
