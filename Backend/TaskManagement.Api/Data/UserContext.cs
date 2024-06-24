using Microsoft.EntityFrameworkCore;
using TaskManagement.Api.Entities;

namespace TaskManagement.Api.Data;

public class UserContext(DbContextOptions<UserContext> options): DbContext(options)
{
    public DbSet<User> Users=>Set<User>();
  //  public DbSet<Role>  Roles=>Set<Role>();

//     protected override void OnModelCreating(ModelBuilder modelBuilder)
//     {
//         modelBuilder.Entity<Role>().HasData(
//             new {Id=1,Name="Admin"},
//             new {Id=2,Name="Editor"},
//             new {Id=3,Name="Viewer"},
//             new {Id=4,Name="Guest"}
//         );
//     }
 }
