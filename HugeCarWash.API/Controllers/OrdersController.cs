using HugeCarWash.Domain.Commons;
using HugeCarWash.Domain.Configurations;
using HugeCarWash.Domain.Entities.Orders;
using HugeCarWash.Domain.Enums;
using HugeCarWash.Service.DTOs.Orders;
using HugeCarWash.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HugeCarService.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : Controller
    {
        private readonly IOrderService orderService;
        private readonly IWebHostEnvironment env;

        public OrdersController(IOrderService orderService, IWebHostEnvironment env)
        {
            this.orderService = orderService;
            this.env = env;
        }

        [HttpPost]
        public async Task<ActionResult<BaseResponse<Order>>> Create(OrderForCreationDto OrderDto)
        {
            var result = await orderService.CreateAsync(OrderDto);

            return StatusCode(result.Error is null ? result.Code : result.Error.Code, result);
        }

        [HttpGet]
        public async Task<ActionResult<BaseResponse<IEnumerable<Order>>>> GetAll([FromQuery] PaginationParams @params)
        {
            var result = await orderService.GetAllAsync(@params);

            return StatusCode(result.Error is null ? result.Code : result.Error.Code, result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse<Order>>> Get([FromRoute] Guid id)
        {
            var result = await orderService.GetAsync(p => p.Id == id);

            return StatusCode(result.Error is null ? result.Code : result.Error.Code, result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<BaseResponse<Order>>> Update(Guid id, [FromForm] OrderForCreationDto OrderDto)
        {
            var result = await orderService.UpdateAsync(id, OrderDto);

            return StatusCode(result.Error is null ? result.Code : result.Error.Code, result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse<bool>>> Delete(Guid id)
        {
            var result = await orderService.DeleteAsync(p => p.Id == id && p.State != ItemState.Deleted);

            return StatusCode(result.Error is null ? result.Code : result.Error.Code, result);
        }
    }
}
