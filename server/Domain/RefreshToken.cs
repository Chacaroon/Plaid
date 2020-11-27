using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class RefreshToken: BaseEntity
    {
        public string Token { get; set; }
        public User User { get; set; }
    }
}
