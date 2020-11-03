using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly DbContext _db;
        public AccountController(DbContext context)
        {
            _db = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody]Login request)
        {
            var user = AuthenticateUser(request.Email, request.Password);

            if (user != null)
            {

            }

            return Unauthorized();
        }
    }

    private Account AuthenticateUser(string email, string password)
    {
        return
    }
}