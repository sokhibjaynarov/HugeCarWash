using HugeCarWash.Domain.Commons;
using HugeCarWash.Domain.Entities.Employees;
using HugeCarWash.Domain.Entities.Users;
using HugeCarWash.Domain.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace HugeCarWash.Domain.Entities.Orders
{
    public class Order : IAuditable
    {
        public Guid Id { get; set; }
        public decimal Price { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public Guid? UpdatedBy { get; set; }
        public ItemState State { get; set; }

        [ForeignKey(nameof(User))]
        public Guid UserId { get; set; }
        public User User { get; set; }


        [ForeignKey(nameof(Employee))]
        public Guid EmployeeId { get; set; }
        public Employee Employee { get; set; }

        public void Update()
        {
            UpdatedAt = DateTime.Now;
            State = ItemState.Updated;
        }

        public void Create()
        {
            CreatedAt = DateTime.Now;
            State = ItemState.Created;
        }

        public void Delete()
        {
            State = ItemState.Deleted;
        }
    }
}
