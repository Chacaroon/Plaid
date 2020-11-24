using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IOptions<AuthOptions> _authOptions;

        public PostController(IMapper mapper,
            IOptions<AuthOptions> authOptions)
        {
            _mapper = mapper;
            _authOptions = authOptions;
        }

    }
}
