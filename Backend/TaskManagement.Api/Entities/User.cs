using Microsoft.AspNetCore.SignalR;

namespace TaskManagement.Api.Entities;

public class User
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }

    public int RoleId{ get; set; }
    public Role? Role { get; set; }
}
