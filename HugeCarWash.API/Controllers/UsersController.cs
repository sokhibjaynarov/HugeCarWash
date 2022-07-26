using HugeCarWash.Domain.Commons;
using HugeCarWash.Domain.Configurations;
using HugeCarWash.Domain.Entities.Users;
using HugeCarWash.Domain.Enums;
using HugeCarWash.Service.DTOs.Users;
using HugeCarWash.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HugeCarService.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IUserService userService;
        private readonly IWebHostEnvironment env;

        public UsersController(IUserService userService, IWebHostEnvironment env)
        {
            this.userService = userService;
            this.env = env;
        }

        [HttpPost]
        public async Task<ActionResult<BaseResponse<User>>> Create(UserForCreationDto userDto)
        {
            var result = await userService.CreateAsync(userDto);

            return StatusCode(result.Error is null ? result.Code : result.Error.Code, result);
        }

        [HttpGet]
        public async Task<ActionResult<BaseResponse<IEnumerable<User>>>> GetAll([FromQuery] PaginationParams @params)
        {
            var result = await userService.GetAllAsync(@params);

            return StatusCode(result.Error is null ? result.Code : result.Error.Code, result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse<User>>> Get([FromRoute] Guid id)
        {
            var result = await userService.GetAsync(p => p.Id == id);

            return StatusCode(result.Error is null ? result.Code : result.Error.Code, result);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<BaseResponse<User>>> Update(Guid id, [FromBody] UserForCreationDto UserDto)
        {
            var result = await userService.UpdateAsync(id, UserDto);

            return StatusCode(result.Error is null ? result.Code : result.Error.Code, result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse<bool>>> Delete(Guid id)
        {
            var result = await userService.DeleteAsync(p => p.Id == id && p.State != ItemState.Deleted);

            return StatusCode(result.Error is null ? result.Code : result.Error.Code, result);
        }
    }
}
