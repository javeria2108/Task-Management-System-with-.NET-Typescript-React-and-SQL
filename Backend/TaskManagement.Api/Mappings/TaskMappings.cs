using Microsoft.EntityFrameworkCore.Migrations.Internal;
using TaskManagement.Api.Dtos.TaskDtos;
using TaskManagement.Api.Models;
using TaskModel = TaskManagement.Api.Models.TaskModel;

namespace TaskManagement.Api.Mappings;

public static class TaskMappings
{
    public static TaskSummaryDto ToTaskSummaryDto(this TaskModel taskModel)
    {
        return new TaskSummaryDto{
            Name=taskModel.Name,
            Priority=taskModel.Priority,
            Category=taskModel.Category,
            Duedate=taskModel.Duedate,
            
        };

    }
    public static TaskModel ToEntity(this CreateTaskDto task){
        return new TaskModel(){
            Name=task.Name,
            Description=task.Description,
            Duedate=task.Duedate,
            Category=task.Category,
            Priority=task.Priority
        };
    }
}
