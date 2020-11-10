using Common.Enums;
using Common.Interfaces;
using System.Collections.Generic;

namespace Domain
{
    public class User : IUserRoles
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Tag { get; set; }
        public string Bio { get; set; }
        public string Password { get; set; }
        public RoleEnum Roles { get; set; }
    }
}
