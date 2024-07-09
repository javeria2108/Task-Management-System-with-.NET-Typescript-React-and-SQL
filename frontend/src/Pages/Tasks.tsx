import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { useGetTasksByUsernameQuery } from '../redux/api/apiSlice';
import { TaskDetailsDto, setTasks } from '../redux/slices/TasksSlice';
import UserTasksCard from '../components/UserTasksCard';

function Tasks() {
    const currentUser=useAppSelector((state)=>state.auth.user);
    console.log(currentUser)
    const dispatch=useAppDispatch();
    const { data: tasks, error, isLoading } = useGetTasksByUsernameQuery(currentUser as string)
    useEffect(() => {
        if (tasks) {
          dispatch(setTasks(tasks));
        }
      }, [tasks, dispatch]);

      console.log(tasks)

  return (
    <div>
        {
            tasks?.map((task: TaskDetailsDto)=>{
                return(
                    <div key={task.id}>
                   <UserTasksCard task={task}/>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Tasks