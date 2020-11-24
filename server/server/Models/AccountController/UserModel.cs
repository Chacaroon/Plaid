using Common.Enums;
using Common.Interfaces;

namespace Server.Models.AccountController
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Tag { get; set; }
        public string Email { get; set; }
        public string Bio { get; set; }
        public string[] Roles { get; set; }
    }
}
