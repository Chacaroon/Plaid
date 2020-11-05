using Common.Enums;
using Common.Interfaces;

namespace Server.Models
{
    public class UserModel : IUserRoles
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Tag { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public RoleEnum Roles { get; set; }
    }
}
