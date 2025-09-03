
using Microsoft.EntityFrameworkCore;
using MyApp.Api.Data;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Add DB context
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
// For PostgreSQL use: options.UseNpgsql(...);

builder.Services.AddControllers();

var app = builder.Build();
app.MapControllers();
app.Run();
