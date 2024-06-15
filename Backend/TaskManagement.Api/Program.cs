using TaskManagement.Api.Dtos;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

List<UserDto> users=[
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
//GET /games
app.MapGet("users",()=>users);
//GET /games/id
app.MapGet("users/{id}",(int id)=>users.Find(user=>user.Id==id
));

app.Run();