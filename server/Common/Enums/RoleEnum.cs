using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Enums
{
    [Flags]
    public enum RoleEnum
    {
        User = 1,
        Admin = 2,
        Creator = 4
    }
}
