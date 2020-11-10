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
        public static string[] ToArrayString(this IUserRoles user, RoleEnum role)
        {
            var strings = new List<string>();

            if (user.HasRole(RoleEnum.Admin))
            {
                strings.Add("admin");
            }

            if (user.HasRole(RoleEnum.Creator))
            {
                strings.Add("creator");
            }

            if (user.HasRole(RoleEnum.User))
            {
                strings.Add("user");
            }

            return strings.ToArray();
        }
    }
}
