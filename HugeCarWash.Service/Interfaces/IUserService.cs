using HugeCarWash.Domain.Commons;
using HugeCarWash.Domain.Configurations;
using HugeCarWash.Domain.Entities.Users;
using HugeCarWash.Service.DTOs.Users;
using System.Linq.Expressions;

namespace HugeCarWash.Service.Interfaces
{
    public interface IUserService
    {
        Task<BaseResponse<User>> CreateAsync(UserForCreationDto userDto);
        Task<BaseResponse<User>> GetAsync(Expression<Func<User, bool>> expression);
        Task<BaseResponse<IEnumerable<User>>> GetAllAsync(PaginationParams @params, Expression<Func<User, bool>> expression = null);
        Task<BaseResponse<bool>> DeleteAsync(Expression<Func<User, bool>> expression);
        Task<BaseResponse<User>> UpdateAsync(Guid id, UserForCreationDto userDto);
    }
}
