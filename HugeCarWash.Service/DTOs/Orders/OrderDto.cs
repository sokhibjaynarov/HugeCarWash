namespace HugeCarWash.Service.DTOs.Orders
{
    public class OrderDto
    {
        public Guid Id { get; set; }
        public string CarNumber { get; set; }
        public string EmployeeName { get; set; }
        public decimal Price { get; set; }
    }
}