import React, { useEffect } from "react";
import { useGetAllTasksQuery, useDeleteTaskMutation } from "../../redux/api/tasksApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setTasks, deleteTask } from "../../redux/slices/TasksSlice";
import { TaskDetails } from "../../redux/types/TaskState.type";
import AdminTasksCard from "../../components/AdminTasksCard";
import { useNavigate } from "react-router-dom";

const AdminTaskPage = () => {
  const { data: tasks, error, isLoading } = useGetAllTasksQuery();
  const dispatch = useAppDispatch();
  const [deleteTaskQuery] = useDeleteTaskMutation();
  const updatedTasks = useAppSelector((state) => state.tasks.tasks); // Selector to get updated tasks

  const handleDelete = async (taskId: number) => {
    try {
      await deleteTaskQuery(taskId).unwrap();
      dispatch(deleteTask(taskId));
      console.log(`Task ${taskId} deleted successfully.`);
      // No need to manually update local state here
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  useEffect(() => {
    if (tasks) {
      dispatch(setTasks(tasks));
    }
  }, [tasks, dispatch]);

  // useEffect for updatedTasks is not necessary here because Redux state update
  // through dispatch(setTasks(tasks)) should trigger a re-render

  const navigate = useNavigate();

  const handleCreateTaskClick = () => {
    navigate("create");
  };

  return (
    <div className="h-5/6 flex flex-col">
      <div className="m-6">
        <button
          onClick={handleCreateTaskClick}
          className="bg-blue p-4 rounded-lg text-white hover:cursor-pointer hover:bg-MediumGrey"
        >
          Create New
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        {tasks?.map((task: TaskDetails) => (
          <div key={task.id} className="mb-4">
            <AdminTasksCard task={task} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTaskPage;
