using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagement.Api.Data;
using TaskManagement.Api.Dtos.TaskDtos;
using TaskManagement.Api.Mappings;
using TaskManagement.Api.Models;


namespace TaskManagement.Api.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    public class TaskControllers : ControllerBase
{
    private readonly ApplicationDBContext _context;

 private readonly UserManager<User> _userManager;
        public TaskControllers(UserManager<User> userManager,ApplicationDBContext context)
        {
            _context = context;
             _userManager = userManager;
        }

        [HttpGet]
    public async Task<IActionResult> GetAll(){
        var tasks=await _context.Task.ToListAsync();
        var taskDtos= tasks.Select(task=>task.ToTaskSummaryDto());
        return Ok(taskDtos);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] int id){
        var task=await _context.Task.FindAsync(id);
        if (task==null){
            return NotFound();
        }
        return Ok(task.ToTaskSummaryDto());
    }

    [HttpPost]
    public async Task<IActionResult> CreateTask([FromBody] CreateTaskDto taskDto){
        var newTask=taskDto.ToEntity();
        newTask.User=await _userManager.Users.FirstOrDefaultAsync(x=>x.UserName==taskDto.Username);
       await  _context.Task.AddAsync(newTask);
       await  _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById),new {id=newTask.Id},newTask.ToTaskSummaryDto());

    }
    [HttpPut("{id}")]

    public async Task<IActionResult> UpdateTask([FromRoute] int id, [FromBody] UpdateTaskDto updatedTaskDto){
        var existingTask=await _context.Task.FirstOrDefaultAsync(task=>Convert.ToInt32(task.Id)==id);
        if (existingTask==null){
            return NotFound();
        }
        existingTask.Name=updatedTaskDto.Name;
        existingTask.Description=updatedTaskDto.Description;
        existingTask.Duedate=updatedTaskDto.Duedate;
        existingTask.Category=updatedTaskDto.Category;
        existingTask.Priority=updatedTaskDto.Priority;
        existingTask.Status=updatedTaskDto.Status;


        await _context.SaveChangesAsync();
        return Ok(existingTask.ToTaskSummaryDto());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask([FromRoute] int id){
         var existingTask=await _context.Task.FirstOrDefaultAsync(user=>Convert.ToInt32(user.Id)==id);
        if (existingTask==null){
            return NotFound();
        }
        _context.Remove(existingTask);
        await _context.SaveChangesAsync();
        return NoContent();
    }

}
}

