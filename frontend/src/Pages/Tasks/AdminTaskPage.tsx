import React, { useEffect } from 'react'
import { useGetAllTasksQuery } from '../../redux/api/tasksApi'
import { useAppDispatch } from '../../redux/hooks'
import { setTasks } from '../../redux/slices/TasksSlice'
import { TaskDetails } from '../../redux/types/TaskState.type'
import AdminTasksCard from '../../components/AdminTasksCard'

const AdminTaskPage = () => {
    const { data: tasks, error, isLoading } = useGetAllTasksQuery()
    console.log(tasks)
    const dispatch= useAppDispatch();
    useEffect(() => {
        if (tasks) {
          dispatch(setTasks(tasks));
        }
      }, [tasks, dispatch]);

  return (
    <>
    <div>
        <div className='m-6'>
        <button className='bg-blue p-4 rounded-lg text-white'>Create New</button>
        </div>
      <div>
        {
            tasks?.map((task: TaskDetails)=>{
                return(
                    <div key={task.id}>
                   <AdminTasksCard task={task}/>
                    </div>
                )
            })
        }
    </div>
    </div>
    </>
  )
}

export default AdminTaskPage