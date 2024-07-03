using Microsoft.EntityFrameworkCore;
using TaskManagement.Api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
namespace TaskManagement.Api.Data;

public class ApplicationDBContext: IdentityDbContext<User>
{
  public ApplicationDBContext(DbContextOptions dbContextOptions): base(dbContextOptions){

  }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
           List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER"
                },
            };
            builder.Entity<IdentityRole>().HasData(roles);
    }

   public DbSet<TaskModel> Task{get;set;}


}
