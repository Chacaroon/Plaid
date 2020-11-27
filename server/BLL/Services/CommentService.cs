
using AutoMapper;
using BLL.Interfaces;
using DAL.Interfaces;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IPostRepository _postRepository;
        private readonly IMapper _mapper;

        public CommentService(ICommentRepository commentRepository,
            IPostRepository postRepository,
            IMapper mapper)
        {
            _commentRepository = commentRepository;
            _postRepository = postRepository;
            _mapper = mapper;
        }

        public void AddComment(string comment, Post post, User user)
        {
            _commentRepository.Add(new Comment()
            {
                Content = comment,
                Post = post,
                AuthorId = user.Id
            });
        }

        public IEnumerable<Comment> GetAllComments(int postId)
        {
            return _commentRepository.GetAll(x => x.PostId == postId);
        }
    }
}
