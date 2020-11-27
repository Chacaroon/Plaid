using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Interfaces
{
    public interface ICommentService
    {
        void AddComment(string comment, Post post, User user);
        IEnumerable<Comment> GetAllComments(int postId);
    }
}
