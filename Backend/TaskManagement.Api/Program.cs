using TaskManagement.Api.Data;
using TaskManagement.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);
var connString=builder.Configuration.GetConnectionString("Users");
builder.Services.AddSqlite<UserContext>(connString);
var app = builder.Build();

app.MapUsersEndpoints();
app.MapRoleEndpoints();
await app.MigrateDbAsync();
app.Run();