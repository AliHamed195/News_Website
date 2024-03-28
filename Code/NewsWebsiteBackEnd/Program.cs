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
using NewsWebsiteBackEnd.SOLR;
using SolrNet;
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

//Solr
builder.Services.AddSolrNet("http://localhost:8983/solr/newswebsite");
builder.Services.AddSingleton<SolrService>();

// ==============================================================================================

//JWT
var jwtSettings = builder.Configuration.GetSection("Jwt").Get<JwtSettings>();
var key = Encoding.ASCII.GetBytes(jwtSettings.Secret);

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidIssuer = jwtSettings.Issuer, // Optional
        ValidAudience = jwtSettings.Audience // Optional
    };
});

// ==============================================================================================

// CORS policy for the client app
builder.Services.AddCors(options =>
{
    options.AddPolicy("EnableCORS", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

// ==============================================================================================

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("EnableCORS");

app.UseAuthentication();
app.UseAuthorization();

//Hubs
app.MapHub<RoleManagementHub>("/ws/Actions/roleEvents");

// ==============================================================================================

app.MapControllers();

app.Run();
