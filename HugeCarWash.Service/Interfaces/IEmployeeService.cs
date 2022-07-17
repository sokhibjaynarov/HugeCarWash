using HugeCarWash.Domain.Commons;
using HugeCarWash.Domain.Configurations;
using HugeCarWash.Domain.Entities.Employees;
using HugeCarWash.Service.DTOs.Employees;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace HugeCarWash.Service.Interfaces
{
    public interface IEmployeeService
    {
        Task<BaseResponse<Employee>> CreateAsync(EmployeeForCreationDto employeeDto);
        Task<BaseResponse<Employee>> GetAsync(Expression<Func<Employee, bool>> expression);
        Task<BaseResponse<IEnumerable<Employee>>> GetAllAsync(PaginationParams @params, Expression<Func<Employee, bool>> expression = null);
        Task<BaseResponse<bool>> DeleteAsync(Expression<Func<Employee, bool>> expression);
        Task<BaseResponse<Employee>> UpdateAsync(Guid id, EmployeeForCreationDto employeeDto);
    }
}
