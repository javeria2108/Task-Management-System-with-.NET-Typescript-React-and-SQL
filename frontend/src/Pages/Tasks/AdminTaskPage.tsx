import React, { useEffect, useState } from "react";
import { useGetAllTasksQuery, useDeleteTaskMutation } from "../../redux/api/tasksApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setTasks, deleteTask } from "../../redux/slices/TasksSlice";
import { TaskDetails } from "../../redux/types/TaskState.type";
import AdminTasksCard from "../../components/AdminTasksCard";
import { useNavigate } from "react-router-dom";

const AdminTaskPage: React.FC = () => {
  const { data: tasksData, error, isLoading } = useGetAllTasksQuery();
  const [tasks, setTasksLocal] = useState<TaskDetails[]>([]);
  const dispatch = useAppDispatch();
  const [deleteTaskQuery] = useDeleteTaskMutation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    if (tasksData) {
      const filteredTasks = applyCategoryFilter(tasksData, selectedCategory);
      setTasksLocal(filteredTasks);
      dispatch(setTasks(tasksData));
    }
  }, [tasksData, selectedCategory, dispatch]);

  const applyCategoryFilter = (tasks: TaskDetails[], category: string): TaskDetails[] => {
    if (category === "All") {
      return tasks;
    } else {
      return tasks.filter(task => task.category === category);
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleDelete = async (taskId: number) => {
    try {
      await deleteTaskQuery(taskId).unwrap();
      dispatch(deleteTask(taskId)); // Update Redux state
      setTasksLocal(prevTasks => prevTasks.filter(task => task.id !== taskId)); // Update local state
      console.log(`Task ${taskId} deleted successfully.`);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleCreateTaskClick = () => {
    navigate("create");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks</div>;

  return (
    <div className="h-5/6 flex flex-col">
      <div className="m-6 flex justify-between w-3/4">
        <button
          onClick={handleCreateTaskClick}
          className="bg-blue p-4 rounded-lg text-white hover:cursor-pointer hover:bg-MediumGrey"
        >
          Create New
        </button>
        <div>
          <label className="mr-2">Filter by Category:</label>
          <select value={selectedCategory} onChange={handleCategoryChange} className="p-2 border rounded-lg">
            <option value="All">All</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Testing">Testing</option>
            <option value="Management">Management</option>
          </select>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        {tasks.map((task: TaskDetails) => (
          <div key={task.id} className="mb-4">
            <AdminTasksCard task={task} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTaskPage;
