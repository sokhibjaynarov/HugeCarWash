using AutoMapper;
using HugeCarWash.Domain.Entities.Employees;
using HugeCarWash.Domain.Entities.Orders;
using HugeCarWash.Domain.Entities.Users;
using HugeCarWash.Service.DTOs.Employees;
using HugeCarWash.Service.DTOs.Orders;
using HugeCarWash.Service.DTOs.Users;

namespace HugeCarWash.Service.Mappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserForCreationDto>().ReverseMap();
            CreateMap<Order, OrderForCreationDto>().ReverseMap();
            CreateMap<Employee, EmployeeForCreationDto>().ReverseMap();
        }
    }
}
