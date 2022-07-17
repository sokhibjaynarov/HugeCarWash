using HugeCarService.Api.Extensions;
using HugeCarWash.API.Configurations;
using HugeCarWash.Data.Contexts;
using HugeCarWash.Service.Helpers;
using HugeCarWash.Service.Mappers;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddCors(p =>
{
    p.AddPolicy("AllowAll", p =>
        p.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());
});

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default"));
});

builder.Services.ConfigureSwagger(builder.Configuration);

builder.Services.AddHttpContextAccessor();

builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddCustomServices();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
