namespace TaskManagement.Api.Dtos;

public record class UserDto(int Id, string Name, string Email,int RoleId,string Role);
