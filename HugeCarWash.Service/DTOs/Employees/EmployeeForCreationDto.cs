using System.ComponentModel.DataAnnotations;

namespace HugeCarWash.Service.DTOs.Employees
{
    public class EmployeeForCreationDto
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        public string? TelegramId { get; set; }
    }
}
