import React, { useEffect } from 'react';
import { useGetAllTasksQuery } from '../../redux/api/tasksApi';
import { useAppDispatch } from '../../redux/hooks';
import { setTasks } from '../../redux/slices/TasksSlice';
import { TaskDetails } from '../../redux/types/TaskState.type';
import AdminTasksCard from '../../components/AdminTasksCard';
import { useNavigate } from 'react-router-dom';

const AdminTaskPage = () => {
  const { data: tasks, error, isLoading } = useGetAllTasksQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tasks) {
      dispatch(setTasks(tasks));
    }
  }, [tasks, dispatch]);

  const navigate = useNavigate();

  const handleCreateTaskClick = () => {
    navigate('create');
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
            <AdminTasksCard task={task} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTaskPage;
