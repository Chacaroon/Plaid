using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Interfaces;
using Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Server.Models.PostController;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IPostService _postService;
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;
        private readonly IOptions<AuthOptions> _authOptions;
        private readonly HtmlEncoder _htmlEncoder;

        public PostsController(IMapper mapper,
            IPostService postService,
            IUserService userService,
            ITokenService tokenService,
            IOptions<AuthOptions> authOptions,
            HtmlEncoder htmlEncoder)
        {
            _mapper = mapper;
            _postService = postService;
            _userService = userService;
            _tokenService = tokenService;
            _authOptions = authOptions;
            _htmlEncoder = htmlEncoder;
        }

        [Authorize(Roles = "Creator")]
        [HttpPost]
        public IActionResult AddPost([FromBody] NewPost post)
        {
            Request.Cookies.TryGetValue("accessToken", out var requestAccessToken);
            var user = _userService.GetCurrentUser(_tokenService.GetCurrentToken(requestAccessToken));
            var content =_htmlEncoder.Encode(post.Post);

            _postService.CreateNewPost(content, user);

            return Ok();
        }

        [HttpGet("{userId}")]
        public IActionResult GetAllPosts([FromRoute]int userId)
        {
            var posts = _mapper.Map<IEnumerable<PostModel>>(_postService.GetAllPosts(userId));
            return Ok(posts);
        }
    }
}
