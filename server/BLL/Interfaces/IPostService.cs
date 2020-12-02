using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Interfaces
{
    public interface IPostService
    {
        void CreateNewPost(string post, User user, int subId);
        Post GetPostById(int id);
        IEnumerable<Post> GetAllPosts(int id);
    }
}
