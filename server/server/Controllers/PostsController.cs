using System;
using System.Collections.Generic;
using System.Linq;
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

        public PostsController(IMapper mapper,
            IPostService postService,
            IUserService userService,
            ITokenService tokenService,
            IOptions<AuthOptions> authOptions)
        {
            _mapper = mapper;
            _postService = postService;
            _userService = userService;
            _tokenService = tokenService;
            _authOptions = authOptions;
        }

        [Authorize(Roles = "Creator")]
        [HttpPost("")]
        public IActionResult AddPost([FromBody] NewPost post)
        {
            Request.Cookies.TryGetValue("accessToken", out var requestAccessToken);
            var user = _userService.GetCurrentUser(_tokenService.GetCurrentToken(requestAccessToken));

            _postService.CreateNewPost(post.Post, user);

            return Ok();
        }
    }
}
