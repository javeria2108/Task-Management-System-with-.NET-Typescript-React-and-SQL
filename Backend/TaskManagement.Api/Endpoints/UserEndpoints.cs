namespace TaskManagement.Api.Endpoints;

using Microsoft.EntityFrameworkCore;
using TaskManagement.Api.Data;
using TaskManagement.Api.Dtos;
using TaskManagement.Api.Entities;
using TaskManagement.Api.Mappings;

public static class UsersEndpoints
{

    const string getUserEndpoint = "GetUser";

    private static readonly List<UserDetailsDto> users = [
        new(
        1, "Javeria Zaheer", "javeriaz@gmail.com",1
    )

    ];

    public static RouteGroupBuilder MapUsersEndpoints(this WebApplication app)
    {
        var group=app.MapGroup("users").WithParameterValidation();;

        //GET /users
        group.MapGet("/", (UserContext dbContext) => 
        dbContext.Users.Include(user=>user.Role).Select(user=>user.ToSummaryDto()).AsNoTracking());

        //GET /users/id
        group.MapGet("/{id}", (int id,UserContext dbContext) =>
        {
            User? user=dbContext.Users.Find(id);
            return user is null ? Results.NotFound() : Results.Ok(user.ToDetailsDto());
        }).WithName(getUserEndpoint);

        // POST /users
        group.MapPost("/", (CreateUserDto newUser, UserContext dbContext) =>
        {
            User user = newUser.ToEntity();
            user.Role=dbContext.Roles.Find(newUser.RoleId);
            dbContext.Users.Add(user);
            dbContext.SaveChanges();
            return Results.CreatedAtRoute(getUserEndpoint, new { id = user.Id },
            user.ToSummaryDto() );
        });

        //PUT /users/id
        group.MapPut("/{id}", (int id, UpdateUserDto updatedUser, UserContext dbContext) =>
        {
            var existingUser=dbContext.Users.Find(id);
            if (existingUser is null)
            {
                return Results.NotFound();
            }
           dbContext.Entry(existingUser).CurrentValues.SetValues(updatedUser.ToEntity(id));
           dbContext.SaveChanges();
            return Results.NoContent();
        });

        //DELETE /users/id
        group.MapDelete("/{id}", (int id) =>
        {
            users.RemoveAll(user => user.Id == id);
            return Results.NoContent();
        }
        );
        return group;
    }


}
