using AutoMapper;
using Common.Enums;
using Common.Extensions;
using Domain;
using Server.Models.AccountController;
using Server.Models.CommentController;
using Server.Models.PostController;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Mapper
{
    public class ApplicationProfile: Profile
    {
        public ApplicationProfile()
        {
            CreateMap<User, UserModel>()
                .ForMember(dst => dst.Roles, opt => opt.MapFrom(src => src.ToArrayString(src.Roles)))
                .ReverseMap();

            CreateMap<RegisterModel, User>()
                .ForMember(dst => dst.HashPassword, opt => opt.MapFrom(src => src.Password))
                .ForMember(dst => dst.Roles, opt => opt.MapFrom(src => RoleEnum.User))
                .AfterMap((src, dst) => {
                    if (src.IsCreator)
                    {
                        dst.AddRole(RoleEnum.Creator);
                    }
                });
            CreateMap<Comment, CommentModel>()
                .ReverseMap();
            CreateMap<Post, PostModel>()
                .ReverseMap();
        }
    }
}
