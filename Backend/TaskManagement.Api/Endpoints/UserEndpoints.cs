namespace TaskManagement.Api.Endpoints;
using TaskManagement.Api.Dtos;
public static class UsersEndpoints
{

    const string getUserEndpoint = "GetUser";

    private static readonly List<UserDto> users = [
        new(
        1, "Javeria Zaheer", "javeriaz@gmail.com"
    ),
    new(
        2, "Fatima Zaheer", "fatimaz@gmail.com"
    ), new(
        3, "dummy user 3", "dummyuser3@gmail.com"
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
        group.MapPost("/", (CreateUserDto newUser) =>
        {
            UserDto user = new(
                users.Count + 1,
                newUser.Name, newUser.Email
            );
            users.Add(user);
            return Results.CreatedAtRoute(getUserEndpoint, new { id = user.Id }, user);
        });

        //PUT /users/id
        group.MapPut("/{id}", (int id, UpdateUserDto updatedUser) =>
        {
            var index = users.FindIndex(user => user.Id == id);
            if (index == -1)
            {
                return Results.NotFound();
            }
            users[index] = new UserDto(
                id,
                updatedUser.Name,
                updatedUser.Email
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
