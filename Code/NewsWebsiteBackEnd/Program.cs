using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NewsWebsiteBackEnd.Context;
using NewsWebsiteBackEnd.Hubs;
using NewsWebsiteBackEnd.Models;
using NewsWebsiteBackEnd.POCO;
using NewsWebsiteBackEnd.Services.Interfaces;
using NewsWebsiteBackEnd.Services.Repositories;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Add Identity services
builder.Services.AddIdentity<ApplicationUsers, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// ==============================================================================================

builder.Services.AddControllers();

// ==============================================================================================

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ==============================================================================================

//Context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    )
);

// ==============================================================================================

// SignalR
builder.Services.AddSignalR();

// ==============================================================================================

//Services
builder.Services.AddScoped<IFoldersServices, FoldersServices>();
builder.Services.AddScoped<IFileServices, FileServices>();

// ==============================================================================================

//POCO
builder.Services.Configure<FolderSettings>(builder.Configuration.GetSection("FoldersName"));
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));

// ==============================================================================================

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

//Hubs
app.MapHub<RoleManagementHub>("/ws/Actions/roleEvents");

// ==============================================================================================

app.MapControllers();

app.Run();
