using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IUserService _userService;

        public CategoryController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var categories = new List<string>() { "none", "music", "art", "games", "literature", "travel" };

            return Ok(categories);
        }

        [HttpGet("{category}/creators")]
        public IActionResult GetAllCreatorsByCategory([FromRoute] string category)
        {
            var t = _userService.GetAllByCategory(category);
            return Ok(t);
        }
    }
}
