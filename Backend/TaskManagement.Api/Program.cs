using TaskManagement.Api.Data;
using TaskManagement.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

// Configure CORS services
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Allow only this origin
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Configure database services
var connString = builder.Configuration.GetConnectionString("Users");
builder.Services.AddSqlite<UserContext>(connString);

var app = builder.Build();

// Configure middleware
app.UseRouting();
app.UseCors(); // Use the default CORS policy

app.MapUsersEndpoints();

await app.MigrateDbAsync();
app.Run();
