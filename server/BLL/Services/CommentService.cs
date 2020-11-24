
using BLL.Interfaces;
using DAL.Interfaces;
using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IPostRepository _postRepository;

        public CommentService(ICommentRepository commentRepository,
            IPostRepository postRepository)
        {
            _commentRepository = commentRepository;
            _postRepository = postRepository;
        }

        public void AddComment(string comment, Post post, User user)
        {
            _commentRepository.Add(new Comment()
            {
                Content = comment,
                Post = post,
                UserId = user.Id
            });
        }
    }
}
