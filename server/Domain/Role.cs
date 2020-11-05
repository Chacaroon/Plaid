using Common.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class Role
    {
        public int RoleId { get; set; }
        public RoleEnum RoleType { get; set; }
    }
}
