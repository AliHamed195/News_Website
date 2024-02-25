using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NewsWebsiteBackEnd.Context;
using NewsWebsiteBackEnd.Models;
using NewsWebsiteBackEnd.POCO;
using NewsWebsiteBackEnd.Services.Interfaces;
using NewsWebsiteBackEnd.Services.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Add Identity services
builder.Services.AddIdentity<ApplicationUsers, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    )
);

//Services
builder.Services.AddScoped<IFoldersServices, FoldersServices>();
builder.Services.AddScoped<IFileServices, FileServices>();

//POCO
builder.Services.Configure<FolderSettings>(builder.Configuration.GetSection("FoldersName"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
