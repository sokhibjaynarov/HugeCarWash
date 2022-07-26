using HugeCarWash.Domain.Enums;

namespace HugeCarWash.Domain.Commons
{
    public interface IAuditable
    {
        Guid Id { get; set; }
        //DateTime CreatedAt { get; set; }
        //DateTime? UpdatedAt { get; set; }
        Guid? UpdatedBy { get; set; }
        ItemState State { get; set; }
    }
}
