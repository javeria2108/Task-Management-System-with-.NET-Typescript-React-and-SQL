namespace TaskManagement.Api.Endpoints;

using TaskManagement.Api.Data;
using TaskManagement.Api.Dtos;
using TaskManagement.Api.Entities;
using TaskManagement.Api.Mappings;

public static class UsersEndpoints
{

    const string getUserEndpoint = "GetUser";

    private static readonly List<UserDto> users = [
        new(
        1, "Javeria Zaheer", "javeriaz@gmail.com",1,"Admin"
    )

    ];

    public static RouteGroupBuilder MapUsersEndpoints(this WebApplication app)
    {
        var group=app.MapGroup("users").WithParameterValidation();;

        //GET /users
        group.MapGet("/", () => users);

        //GET /users/id
        group.MapGet("/{id}", (int id) =>
        {
            UserDto? user = users.Find(user => user.Id == id);
            return user is null ? Results.NotFound() : Results.Ok(user);
        }).WithName(getUserEndpoint);

        // POST /users
        group.MapPost("/", (CreateUserDto newUser, UserContext dbContext) =>
        {
            User user = newUser.ToEntity();
            user.Role=dbContext.Roles.Find(user.RoleId);
            dbContext.Users.Add(user);
            dbContext.SaveChanges();
            return Results.CreatedAtRoute(getUserEndpoint, new { id = user.Id },
            user.ToDto() );
        });

        //PUT /users/id
        group.MapPut("/{id}", (int id, UpdateUserDto updatedUser, UserContext dbContext) =>
        {
            var index = users.FindIndex(user => user.Id == id);
            if (index == -1)
            {
                return Results.NotFound();
            }
            users[index] = new UserDto(
                id,
                updatedUser.Name,
                updatedUser.Email,
                updatedUser.RoleId,
                dbContext.Roles.Find(updatedUser.RoleId)!.Name
            );
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
