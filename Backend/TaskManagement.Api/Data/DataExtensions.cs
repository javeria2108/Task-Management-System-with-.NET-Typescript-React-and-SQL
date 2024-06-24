using Microsoft.EntityFrameworkCore;
using TaskManagement.Api.Entities;

namespace TaskManagement.Api.Data;

public static class DataExtensions
{
    public static async Task MigrateDbAsync(this WebApplication app){
        var scope=app.Services.CreateScope();
        var dbContext=scope.ServiceProvider.GetRequiredService<UserContext>();
        await dbContext.Database.MigrateAsync();
    }
}
