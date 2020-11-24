using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Models.CommentController;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;
        private readonly IPostService _postService;

        public CommentsController(ICommentService commentService,
             IUserService userService,
            ITokenService tokenService, 
            IPostService postService)
        {
            _commentService = commentService;
            _userService = userService;
            _tokenService = tokenService;
            _postService = postService;
        }

        [HttpPost]
        public IActionResult AddComments([FromBody]CommentModel comment)
        {
            Request.Cookies.TryGetValue("accessToken", out var requestAccessToken);

            var user = _userService.GetCurrentUser(_tokenService.GetCurrentToken(requestAccessToken));
            var post = _postService.GetPostById(comment.PostId);

            _commentService.AddComment(comment.Content, post, user);

            return Ok();
        }
    }
}
