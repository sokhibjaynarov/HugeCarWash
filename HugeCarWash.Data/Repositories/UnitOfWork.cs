using HugeCarWash.Data.Contexts;
using HugeCarWash.Data.IRepositories;
using Microsoft.Extensions.Configuration;

namespace HugeCarWash.Data.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext context;
        private readonly IConfiguration config;

        public IUserRepository Users { get; private set; }
        public IOrderRepository Orders { get; private set; }
        public IEmployeeRepository Employees { get; private set; }

        public UnitOfWork(AppDbContext context, IConfiguration config)
        {
            this.context = context;
            this.config = config;

            // Object initializing for repositories
            Users = new UserRepository(context);
            Orders = new OrderRepository(context);
            Employees = new EmployeeRepository(context);
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
