﻿using AutoMapper;
using HugeCarWash.Data.IRepositories;
using HugeCarWash.Domain.Commons;
using HugeCarWash.Domain.Configurations;
using HugeCarWash.Domain.Entities.Employees;
using HugeCarWash.Domain.Enums;
using HugeCarWash.Service.DTOs.Employees;
using HugeCarWash.Service.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Linq.Expressions;

namespace HugeCarWash.Service.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IConfiguration config;
        private readonly IMapper mapper;

        public EmployeeService(IUnitOfWork unitOfWork, IConfiguration config, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.config = config;
            this.mapper = mapper;
        }
        public async Task<BaseResponse<Employee>> CreateAsync(EmployeeForCreationDto employeeDto)
        {
            var response = new BaseResponse<Employee>();

            // check for employee
            var existEmployee = await unitOfWork.Users.GetAsync(p => p.PhoneNumber == employeeDto.PhoneNumber);
            if (existEmployee is not null)
            {
                response.Error = new ErrorResponse(400, "Employee is exist");
                return response;
            }

            var mappedEmployee = mapper.Map<Employee>(employeeDto);

            mappedEmployee.Create();

            var result = await unitOfWork.Employees.CreateAsync(mappedEmployee);

            await unitOfWork.SaveChangesAsync();

            response.Data = result;

            return response;
        }

        public async Task<BaseResponse<bool>> DeleteAsync(Expression<Func<Employee, bool>> expression)
        {
            var response = new BaseResponse<bool>();

            // check for Employee
            var existEmployee = await unitOfWork.Employees.GetAsync(expression);
            if (existEmployee is null)
            {
                response.Error = new ErrorResponse(404, "Employee not found");
                return response;
            }

            existEmployee.Delete();

            var result = await unitOfWork.Employees.UpdateAsync(existEmployee);

            await unitOfWork.SaveChangesAsync();

            response.Data = true;

            return response;
        }

        public async Task<BaseResponse<IEnumerable<Employee>>> GetAllAsync(PaginationParams @params, Expression<Func<Employee, bool>> expression = null)
        {
            var response = new BaseResponse<IEnumerable<Employee>>();

            var Employees = await unitOfWork.Employees.GetAllAsync(expression);

            response.Data = Employees;

            return response;
        }

        public async Task<BaseResponse<Employee>> GetAsync(Expression<Func<Employee, bool>> expression)
        {
            var response = new BaseResponse<Employee>();

            var Employee = await unitOfWork.Employees.GetAsync(expression);
            if (Employee is null)
            {
                response.Error = new ErrorResponse(404, "Employee not found");
                return response;
            }

            response.Data = Employee;

            return response;
        }

        public async Task<BaseResponse<Employee>> UpdateAsync(Guid id, EmployeeForCreationDto employeeDto)
        {
            var response = new BaseResponse<Employee>();

            // check for Employee
            var employee = await unitOfWork.Employees.GetAsync(p => p.Id == id && p.State != ItemState.Deleted);
            if (employee is null)
            {
                response.Error = new ErrorResponse(400, "Employee is not exist");
                return response;
            }

            employee.FirstName = employeeDto.FirstName;
            employee.LastName = employeeDto.LastName;
            employee.PhoneNumber = employeeDto.PhoneNumber;
            employee.TelegramId = employeeDto.TelegramId;

            employee.Update();

            var result = await unitOfWork.Employees.UpdateAsync(employee);

            await unitOfWork.SaveChangesAsync();

            response.Data = result;

            return response;
        }
    }
}
