namespace HugeCarWash.Service.DTOs.Orders
{
    public class OrderMapDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid EmployeeId { get; set; }
        public decimal Price { get; set; }
    }
}
