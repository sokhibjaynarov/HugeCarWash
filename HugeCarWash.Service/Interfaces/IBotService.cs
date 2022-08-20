using HugeCarWash.Domain.Entities.Orders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HugeCarWash.Service.Interfaces
{
    public interface IBotService
    {
        Task<bool> SendMessageAsync(string telegramId, Order order);
    }
}
