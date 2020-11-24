using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Interfaces
{
    public interface IPostService
    {
        public void CreateNewPost(string post, User user);
    }
}
