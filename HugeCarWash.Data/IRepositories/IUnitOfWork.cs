namespace HugeCarWash.Data.IRepositories
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository Users { get; }
        IEmployeeRepository Employees { get; }
        IOrderRepository Orders { get; }

        Task SaveChangesAsync();
    }
}
