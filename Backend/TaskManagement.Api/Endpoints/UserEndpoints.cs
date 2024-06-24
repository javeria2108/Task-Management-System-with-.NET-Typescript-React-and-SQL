namespace TaskManagement.Api.Endpoints;

using Microsoft.EntityFrameworkCore;
using TaskManagement.Api.Data;
using TaskManagement.Api.Dtos;
using TaskManagement.Api.Entities;
using TaskManagement.Api.Mappings;

public static class UsersEndpoints
{

    const string getUserEndpoint = "GetUser";

    public static RouteGroupBuilder MapUsersEndpoints(this WebApplication app)
    {
        var group=app.MapGroup("users").WithParameterValidation();;

        //GET /users
        group.MapGet("/", async (UserContext dbContext) => 
      await dbContext.Users.Select(user=>user.ToSummaryDto()).AsNoTracking().ToListAsync());

        //GET /users/id
        group.MapGet("/{id}", async(int id,UserContext dbContext) =>
        {
            User? user=await dbContext.Users.FindAsync(id);
            return user is null ? Results.NotFound() : Results.Ok(user.ToDetailsDto());
        }).WithName(getUserEndpoint);

        // POST /users
        group.MapPost("/", async (CreateUserDto newUser, UserContext dbContext) =>
      {
            User user = newUser.ToEntity();
            dbContext.Users.Add(user);
             await dbContext.SaveChangesAsync();
            return Results.CreatedAtRoute(getUserEndpoint, new { id = user.Id },
            user.ToSummaryDto() );
        });

        //PUT /users/id
        group.MapPut("/{id}", async (int id, UpdateUserDto updatedUser, UserContext dbContext) =>
        {
           var existingUser=await  dbContext.Users.FindAsync(id);
            if (existingUser is null)
            {
                return Results.NotFound();
            }
           dbContext.Entry(existingUser).CurrentValues.SetValues(updatedUser.ToEntity(id));
          await dbContext.SaveChangesAsync();
            return Results.NoContent();
        });

        //DELETE /users/id
        group.MapDelete("/{id}", async (int id, UserContext dbContext) =>
        {
           await dbContext.Users.Where(user=>user.Id==id).ExecuteDeleteAsync();
            return Results.NoContent();
        }
        );
        return group;
    }


}
