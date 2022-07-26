using HugeCarWash.Domain.Commons;
using HugeCarWash.Domain.Configurations;
using HugeCarWash.Domain.Entities.Employees;
using HugeCarWash.Domain.Enums;
using HugeCarWash.Service.DTOs.Employees;
using HugeCarWash.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HugeCarWash.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService employeeService;
        private readonly IWebHostEnvironment env;

        public EmployeesController(IEmployeeService employeeService, IWebHostEnvironment env)
        {
            this.employeeService = employeeService;
            this.env = env;
        }

        [HttpPost]
        public async Task<ActionResult<BaseResponse<Employee>>> Create(EmployeeForCreationDto employeeDto)
        {
            var result = await employeeService.CreateAsync(employeeDto);

            return StatusCode(result.Error is null ? result.Code : result.Error.Code, result);
        }

        [HttpGet]
        public async Task<ActionResult<BaseResponse<IEnumerable<Employee>>>> GetAll([FromQuery] PaginationParams @params)
        {
            var result = await employeeService.GetAllAsync(@params);

            return StatusCode(result.Error is null ? result.Code : result.Error.Code, result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse<Employee>>> Get([FromRoute] Guid id)
        {
            var result = await employeeService.GetAsync(p => p.Id == id);

            return StatusCode(result.Error is null ? result.Code : result.Error.Code, result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<BaseResponse<Employee>>> Update(Guid id, [FromBody] EmployeeForCreationDto employeeDto)
        {
            var result = await employeeService.UpdateAsync(id, employeeDto);

            return StatusCode(result.Error is null ? result.Code : result.Error.Code, result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse<bool>>> Delete(Guid id)
        {
            var result = await employeeService.DeleteAsync(p => p.Id == id && p.State != ItemState.Deleted);

            return StatusCode(result.Error is null ? result.Code : result.Error.Code, result);
        }
    }
}
