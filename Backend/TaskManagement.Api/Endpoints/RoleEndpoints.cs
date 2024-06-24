// using Microsoft.EntityFrameworkCore;
// using TaskManagement.Api.Data;
// using TaskManagement.Api.Mappings;

// namespace TaskManagement.Api.Endpoints;

// public static class RoleEndpoints
// {
//     public static RouteGroupBuilder MapRoleEndpoints(this WebApplication app){
//         var group=app.MapGroup("roles");
//         group.MapGet("/",async (UserContext dbContext)=>
//             await dbContext.Roles.Select(role=>role.ToDto()).AsNoTracking().ToListAsync());

//             return group;
//     }
// }
