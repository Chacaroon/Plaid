using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using AutoMapper;
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
        private readonly IMapper _mapper;

        public CommentsController(ICommentService commentService,
             IUserService userService,
            ITokenService tokenService, 
            IPostService postService,
            IMapper mapper)
        {
            _commentService = commentService;
            _userService = userService;
            _tokenService = tokenService;
            _postService = postService;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult AddComments([FromBody]CommentAddModel model)
        {
            Request.Cookies.TryGetValue("accessToken", out var requestAccessToken);

            var user = _userService.GetCurrentUser(_tokenService.GetCurrentToken(requestAccessToken));
            var post = _postService.GetPostById(model.PostId);
            
            _commentService.AddComment(model.Content, post, user);

            return Ok();
        }

        [HttpGet("{postId}")]
        public IActionResult GetAllComments([FromRoute] int postId)
        {
            var comments =_mapper.Map<IEnumerable<CommentModel>>(_commentService.GetAllComments(postId));

            return Ok(comments);
        }
    }
}
