using System.ComponentModel.DataAnnotations;

namespace TaskManagement.Api.Dtos;

public record class CreateUserDto(
    [Required][StringLength(50)]string Name,
    [Required][StringLength(100)] string Email,
    [Required]string Password);
