using BLL.Interfaces;
using DAL.Interfaces;
using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Services
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _postRepository;
        private readonly IUserRepository _userRepository;

        public PostService(IPostRepository postRepository,
            IUserRepository userRepository)
        {
            _postRepository = postRepository;
            _userRepository = userRepository;
        }

        public void CreateNewPost(string post, User user)
        {
            _postRepository.Add(new Post()
            {
                Content = post,
                User = user
            });
        }

        public Post GetPostById(int id)
        {
            return _postRepository.GetById(id);
        }

        public ICollection<Post> GetAllPosts(int id)
        {
            return _userRepository.GetById(id).Posts;
        }
    }
}
