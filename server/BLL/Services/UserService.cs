﻿using BLL.Interfaces;
using DAL.Interfaces;
using Domain;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Web.Helpers;

namespace BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public User AuthenticateUser(string email, string password)
        {
            var user = _userRepository.GetAll(x => x.Email == email)
               .SingleOrDefault();
            return Crypto.VerifyHashedPassword(user.HashPassword, password) ? user : null;
        }

        public bool IsEmailTaken(string email)
        {
            return _userRepository.GetAll(x => x.Email == email).SingleOrDefault() != null;
        }

        public bool IsTagTaken(string tag)
        {
            return _userRepository.GetAll(x => x.Tag == tag).SingleOrDefault() != null;
        }

        public User GetCurrentUser(JwtSecurityToken token)
        {
            return _userRepository.GetById(Convert.ToInt32(token.Claims.First(claim => claim.Type == "sub").Value));
        }

        public void ChangeBio(User user, string bio)
        {
            _userRepository.UpdateBIO(user, bio);
        }
    }
}
