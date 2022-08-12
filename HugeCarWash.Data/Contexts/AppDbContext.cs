using HugeCarWash.Domain.Entities.Employees;
using HugeCarWash.Domain.Entities.Orders;
using HugeCarWash.Domain.Entities.Users;
using Microsoft.EntityFrameworkCore;

namespace HugeCarWash.Data.Contexts
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<UserHelper> UserHelpers { get; set; }
    }
}
