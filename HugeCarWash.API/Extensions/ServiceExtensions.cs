using HugeCarWash.Data.IRepositories;
using HugeCarWash.Data.Repositories;
using HugeCarWash.Service.Interfaces;
using HugeCarWash.Service.Services;

namespace HugeCarService.Api.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddCustomServices(this IServiceCollection services)
        {
            services
                .AddScoped<IUnitOfWork, UnitOfWork>()
                .AddScoped<IEmployeeService, EmployeeService>()
                .AddScoped<IUserService, UserService>()
                .AddScoped<IOrderService, OrderService>()
                .AddScoped<IBotClient, BotClient>();
        }
    }
}
