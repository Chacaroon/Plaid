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
        private readonly ISubscriptionLevelRepository _subscriptionLevelRepository;
        private readonly ISubscriptionRepository _subscriptionRepository;

        public PostService(IPostRepository postRepository,
            IUserRepository userRepository,
            ISubscriptionLevelRepository subscriptionLevelRepository,
            ISubscriptionRepository subscriptionRepository)
        {
            _postRepository = postRepository;
            _userRepository = userRepository;
            _subscriptionLevelRepository = subscriptionLevelRepository;
            _subscriptionRepository = subscriptionRepository;
        }

        public void CreateNewPost(string post, User user, int subId)
        {
            var subLevel = _subscriptionLevelRepository.GetById(subId);

            _postRepository.Add(new Post()
            {
                Content = post,
                User = user,
                SubscriptionLevel = subLevel
            });
        }

        public Post GetPostById(int id)
        {
            return _postRepository.GetById(id);
        }

        public IEnumerable<Post> GetAllPosts(int id)
        {
            return _userRepository.GetById(id).Posts;
        }

        //TODO: Realize
        //public IEnumerable<Post> GetAllAccessedPosts(User user)
        //{
        //    return;    
        //}
    }
}
