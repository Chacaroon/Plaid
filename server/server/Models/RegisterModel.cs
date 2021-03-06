﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class RegisterModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Tag { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
    
        [Required]
        public string Password { get; set; }

        public bool IsCreator { get; set; }
    }
}
