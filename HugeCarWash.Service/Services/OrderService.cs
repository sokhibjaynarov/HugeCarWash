﻿using AutoMapper;
using HugeCarWash.Data.IRepositories;
using HugeCarWash.Domain.Commons;
using HugeCarWash.Domain.Configurations;
using HugeCarWash.Domain.Entities.Orders;
using HugeCarWash.Domain.Enums;
using HugeCarWash.Service.DTOs.Orders;
using HugeCarWash.Service.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Linq.Expressions;

namespace HugeCarWash.Service.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IConfiguration config;
        private readonly IMapper mapper;
        private readonly IBotService botService;

        public OrderService(IUnitOfWork unitOfWork, IConfiguration config, IMapper mapper, IBotService botService)
        {
            this.unitOfWork = unitOfWork;
            this.config = config;
            this.mapper = mapper;
            this.botService = botService;
        }
        public async Task<BaseResponse<Order>> CreateAsync(OrderForCreationDto orderDto)
        {
            var response = new BaseResponse<Order>();

            var mappedOrder = mapper.Map<Order>(orderDto);

            var user = await unitOfWork.Users.GetAsync(p => p.Id == orderDto.UserId);

            mappedOrder.Create();

            var result = await unitOfWork.Orders.CreateAsync(mappedOrder);

            await unitOfWork.SaveChangesAsync();

            response.Data = result;

            var a = await botService.SendMessageAsync(user.TelegramId, mappedOrder);

            return response;
        }

        public async Task<BaseResponse<bool>> DeleteAsync(Expression<Func<Order, bool>> expression)
        {
            var response = new BaseResponse<bool>();

            // check for Order
            var existOrder = await unitOfWork.Orders.GetAsync(expression);
            if (existOrder is null)
            {
                response.Error = new ErrorResponse(404, "Order not found");
                return response;
            }

            existOrder.Delete();

            var result = await unitOfWork.Orders.UpdateAsync(existOrder);

            await unitOfWork.SaveChangesAsync();

            response.Data = true;

            return response;
        }

        public async Task<BaseResponse<IEnumerable<Order>>> GetAllAsync(PaginationParams @params, Expression<Func<Order, bool>> expression = null)
        {
            var response = new BaseResponse<IEnumerable<Order>>();

            var orders = await unitOfWork.Orders.GetAllAsync(expression);

            response.Data = orders;

            return response;
        }

        public async Task<BaseResponse<IEnumerable<OrderDto>>> GetAllOrdersAsync()
        {
            var response = new BaseResponse<IEnumerable<OrderDto>>();

            var orders = await unitOfWork.Orders.GetAllAsync(null);

            var users = await unitOfWork.Users.GetAllAsync(null);

            var employees = await unitOfWork.Employees.GetAllAsync(null);

            var dtos = orders.Join(users, order => order.UserId, user => user.Id, (order, user) => new { Id = order.Id, CarNumber = user.CarNumber, EId = order.EmployeeId, Price = order.Price })
                .ToList().Join(employees, dto => dto.EId, employee => employee.Id, (dto, employee) => new { Id = dto.Id, EmployeeName = employee.FirstName, CarNumber = dto.CarNumber, Price = dto.Price }).ToList();

            List<OrderDto> orderDtos = new List<OrderDto>();

            foreach (var dto in dtos)
            {
                orderDtos.Add(new OrderDto()
                {
                    Id = dto.Id,
                    EmployeeName = dto.EmployeeName,
                    Price = dto.Price,
                    CarNumber = dto.CarNumber
                });
            }

            response.Data = orderDtos;

            return response;
        }

        public async Task<BaseResponse<Order>> GetAsync(Expression<Func<Order, bool>> expression)
        {
            var response = new BaseResponse<Order>();

            var Order = await unitOfWork.Orders.GetAsync(expression);
            if (Order is null)
            {
                response.Error = new ErrorResponse(404, "Order not found");
                return response;
            }

            response.Data = Order;

            return response;
        }

        public async Task<BaseResponse<Order>> UpdateAsync(Guid id, OrderForCreationDto orderDto)
        {
            var response = new BaseResponse<Order>();

            // check for Order
            var order = await unitOfWork.Orders.GetAsync(p => p.Id == id && p.State != ItemState.Deleted);
            if (order is null)
            {
                response.Error = new ErrorResponse(400, "Order is not exist");
                return response;
            }

            //order.UserId = orderDto.UserId;
            //order.EmployeeId = orderDto.EmployeeId;
            //order.Price = orderDto.Price;

            order.Update();

            var result = await unitOfWork.Orders.UpdateAsync(order);

            await unitOfWork.SaveChangesAsync();

            response.Data = result;

            return response;
        }
    }
}
