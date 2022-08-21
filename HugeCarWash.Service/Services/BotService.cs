using HugeCarWash.Data.IRepositories;
using HugeCarWash.Data.Repositories;
using HugeCarWash.Domain.Entities.Orders;
using HugeCarWash.Domain.Entities.Users;
using HugeCarWash.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HugeCarWash.Service.Services
{
    public class BotService : IBotService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IBotClient botClient;
        public BotService(IUnitOfWork unitOfWork, IBotClient botClient)
        {
            this.unitOfWork = unitOfWork;
            this.botClient = botClient;
        }
        public async Task<bool> SendMessageAsync(string telegramId, Order order)
        {
            var result = false;
            var numberOfOrders = (await unitOfWork.Orders.GetAllAsync(p => p.UserId == order.UserId)).ToList().Count;

            string messageUz = "Assalomu aleykum! \n" +
                "Siz bizning Huge Car Wash servislaridan foylandingiz!\n" +
                $"Xizmat narxi: {order.Price} so'm\n" +
                $"Jami ko'rsatilgan servislar soni: {numberOfOrders}\n" +
                $"Aloqa uchun: +998 93 484 38 68\n" +
                $"Telegram: @hugecarwash ";

            string messageRu = "Ru";

            var user = await unitOfWork.Users.GetAsync(p => p.TelegramId == telegramId);

            if (user.Language == "uz")
                result = await botClient.SendMessageAsync(telegramId, messageUz);
            else
                result = await botClient.SendMessageAsync(telegramId, messageRu);

            return result;
        }
    }
}
