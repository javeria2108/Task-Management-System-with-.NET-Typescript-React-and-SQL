// using TaskManagement.Api.Dtos.UserDtos;
// using TaskManagement.Api.Models;

// namespace TaskManagement.Api.Mappings;

// public static class UserMapping
// {
//     public static User ToEntity(this CreateUserDto user){
//         return new User(){
//             Name=user.Name,
//             Email=user.Email,
//             Password=user.Password
//         };
//     }
//     public static UserDetailsDto ToDetailsDto(this User user){
//         return new (
//             user.Id,
//             user.Name,
//             user.Email
//         );
//     }
//      public static UserSummaryDto ToSummaryDto(this User user){
//         return new (
//             user.Id,
//             user.Name,
//             user.Email);
//     }

//     public static User ToEntity(this UpdateUserDto user,string id){
//         return new User(){
//             Id=id,
//             Name=user.Name,
//             Email=user.Email,
//             Password=user.Password
//         };
//     }

// }
