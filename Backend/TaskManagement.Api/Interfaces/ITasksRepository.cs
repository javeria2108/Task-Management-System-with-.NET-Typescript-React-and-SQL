using TaskManagement.Api.Models;

namespace TaskManagement.Api.Interfaces
{
    public interface ITasksRepository
{
    Task<List<TaskModel>> GetAllAsync();
}
}


