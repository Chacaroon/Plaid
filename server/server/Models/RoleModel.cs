using Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class RoleModel
    {
        public int RoleId { get; set; }
        public RoleEnum RoleType { get; set; }
    }
}
