namespace TaskManagement.Api.Dtos;
using System.ComponentModel.DataAnnotations;
public record class UpdateUserDto(
    [Required][StringLength(50)]string Name,
    [Required][StringLength(100)] string Email
);
