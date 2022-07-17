using HugeCarWash.Data.IRepositories;
using HugeCarWash.Data.Repositories;
using HugeCarWash.Service.Interfaces;
using HugeCarWash.Service.Services;

namespace Delivery.Api.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddCustomServices(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IUserService, UserService>();
        }
    }
}
