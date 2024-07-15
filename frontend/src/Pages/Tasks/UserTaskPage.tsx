import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useGetTasksByUsernameQuery } from '../../redux/api/tasksApi'
import {setTasks } from '../../redux/slices/TasksSlice';
import { TaskDetails } from '../../redux/types/TaskState.type';
import UserTasksCard from '../../components/UserTasksCard';
import { useApplyCategoryFilter } from '../../hooks/Filter';

const UserTasks: React.FC=()=> {
    const currentUser=useAppSelector((state)=>state.auth.user);
    console.log(currentUser)
    const dispatch=useAppDispatch();
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [tasks, setTasksLocal] = useState<TaskDetails[]>([]);
    const { data: tasksData, error, isLoading } = useGetTasksByUsernameQuery(currentUser as string)
    useEffect(() => {
        if (tasksData) {
          dispatch(setTasks(tasksData));
        }
      }, [tasksData, dispatch]);
      const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
      };

      useEffect(() => {
        if (tasksData) {
          const filteredTasks = useApplyCategoryFilter(tasksData, selectedCategory);
          setTasksLocal(filteredTasks);
        }
      }, [tasksData, selectedCategory]);

  return (
    <div>
       <div>
          <label className="p-10 m-5 text-white">Filter by Category:</label>
          <select value={selectedCategory} onChange={handleCategoryChange} className="p-2 border rounded-lg
          border-blue mt-5 mb-10 bg-blue text-white">
            <option value="All">All</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Testing">Testing</option>
            <option value="Management">Management</option>
          </select>
        </div>
        {
            tasks?.map((task: TaskDetails)=>{
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

export default UserTasks

