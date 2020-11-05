using Common.Enums;
using Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Extensions
{
    public static class UserRoleExtension
    {
        public static bool HasRole(this IUserRoles user, RoleEnum role) => (user.Roles & role) == role;
        public static void AddRole(this IUserRoles user, RoleEnum role) => user.Roles |= role;
    }
}
