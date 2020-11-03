using AutoMapper;
using Domain;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Mapper
{
    public class AccountProfile: Profile
    {
        public AccountProfile()
        {
            CreateMap<User, UserModel>()
                .ReverseMap();
        }
    }
}
