using System.ComponentModel.DataAnnotations;

namespace HugeCarWash.Service.DTOs.Orders
{
    public class OrderForCreationDto
    {
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public Guid EmployeeId { get; set; }
        [Required]
        public decimal Price { get; set; }
    }
}
