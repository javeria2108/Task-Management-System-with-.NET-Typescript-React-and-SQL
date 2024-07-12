import { useParams } from "react-router-dom";
import { useGetTaskByIdQuery, useUpdateTaskMutation } from "../redux/api/tasksApi";
import { useForm } from "react-hook-form";
import { TaskSchema, taskSchema } from "../Schemas/TaskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";


const AdminTaskDetails: React.FC=() => {
   const {id}=useParams();
   const {data: task, error, isLoading}=useGetTaskByIdQuery(parseInt(id as string))
   const [updateTask]=useUpdateTaskMutation();
   const {register, handleSubmit, setValue, formState: {errors}}=useForm<taskSchema>({
      resolver: zodResolver(TaskSchema)
   })
   const [isEditable, setIsEditable]=useState({
      name: false,
      description: false,
      priority: false,
      category: false,
      duedate: false,
      username: false,
    })

    useEffect(()=>{
      if(task){
         setValue("name", task.name);
         setValue("description", task.description);
         setValue("priority", task.priority);
         setValue("category", task.category);
         setValue("duedate", new Date(task.duedate));
      }
    })
   console.log(task)
 return(
    <>
    
    </>
 )
};

export default AdminTaskDetails;
