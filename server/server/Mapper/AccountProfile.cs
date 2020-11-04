using AutoMapper;
using Common.Enums;
using Common.Extensions;
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

            CreateMap<RegisterModel, User>()
                .ForMember(dst => dst.Roles, opt => opt.MapFrom(src => RoleEnum.User))
                .AfterMap((src, dst) => {
                    if (src.IsCreator)
                    {
                        dst.AddRole(RoleEnum.Creator);
                    }
                });
        }
    }
}
