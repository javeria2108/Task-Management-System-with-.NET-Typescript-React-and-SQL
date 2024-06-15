using TaskManagement.Api.Dtos;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

const string getUserEndpoint = "GetUser";

List<UserDto> users = [
    new(
        1, "Javeria Zaheer", "javeriaz@gmail.com"
    ),
    new(
        2, "Fatima Zaheer", "fatimaz@gmail.com"
    ), new(
        3, "dummy user 3", "dummyuser3@gmail.com"
    )

];

app.MapGet("/", () => "Hello World!");

//GET /users
app.MapGet("users", () => users);

//GET /users/id
app.MapGet("users/{id}", (int id) => users.Find(user => user.Id == id
)).WithName(getUserEndpoint);

// POST /users
app.MapPost("users", (CreateUserDto newUser) =>
{
    UserDto user = new(
        users.Count + 1,
        newUser.Name, newUser.Email
    );
    users.Add(user);
    return Results.CreatedAtRoute(getUserEndpoint, new { id = user.Id }, user);
});

//PUT /users/id
app.MapPut("users/{id}", (int id, UpdateUserDto updatedUser) =>
{
    var index = users.FindIndex(user => user.Id == id);
    users[index] = new UserDto(
        id,
        updatedUser.Name,
        updatedUser.Email
    );
    return Results.NoContent();
});

app.Run();