using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Interfaces
{
    public interface IPostService
    {
        void CreateNewPost(string post, User user);
        Post GetPostById(int id);
        ICollection<Post> GetAllPosts(int id);
    }
}
