import { useParams } from "react-router-dom";
import { useGetTaskByIdQuery, useUpdateTaskMutation } from "../../redux/api/tasksApi";
import { useForm } from "react-hook-form";
import { TaskDetailsSchema } from "../../Schemas/TaskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditableFields } from "../../constants";
import { TaskDetails } from "../../redux/types/TaskState.type";
import { format } from 'date-fns';
import { useAppDispatch } from "../../redux/hooks";
import { editTask } from "../../redux/slices/TasksSlice";

const UserTaskDetails: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { data: taskData} = useGetTaskByIdQuery(parseInt(id as string));
  const [task, setTask] = useState<TaskDetails>();
  const [msg, setMsg]=useState("")
  const [error, setError]=useState("")
console.log(id)
  const [updateTask] = useUpdateTaskMutation();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<TaskDetails>({
    resolver: zodResolver(TaskDetailsSchema)
  });
  const [isEditable, setIsEditable] = useState({
    name: false,
    description: false,
    priority: false,
    category: false,
    duedate: false,
    username: false,
    status: false,
  });

  // Update local task state when taskData changes
  useEffect(() => {
    if (taskData) {
      setTask(taskData);
      setValue("name", taskData.name);
      setValue("description", taskData.description);
      setValue("priority", taskData.priority);
      setValue("category", taskData.category);
      setValue("duedate", format(new Date(taskData.duedate), 'yyyy-MM-dd') as unknown as Date); // format to 'yyyy-MM-dd'
      setValue("username", taskData.username);
      setValue("status", taskData.status);
    }
  }, [taskData, setValue]);

  const onSubmit = async (data: TaskDetails) => {
    try {
      const taskId=parseInt(id as string)
      const updatedTask = await updateTask({ ...data, id:taskId }).unwrap();
      setTask(updatedTask); // Update local task state
      dispatch(editTask(updatedTask)); // Dispatch Redux action if necessary
      console.log("Task updated successfully");
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-lightGrey m-5 p-6 rounded-lg
    text-lightPink">
      <h1 className="text-2xl sm:text-3xl text-white mb-6">Task Details</h1>
      <div className="grid grid-cols-2 gap-4 w-4/5">
        {/* Left Column */}
        <div className="flex flex-col gap-2">
          <div className="relative">
            <label className="text-blue">Name</label>
            <input
              {...register("name")}
              placeholder="Task Name"
              className={`p-2 border rounded-xl w-full bg-darkGrey`}
              readOnly={!isEditable.name}
            />
          </div>

          <div className="relative">
            <label className="text-blue">Description</label>
            <textarea
              {...register("description")}
              placeholder="Description"
              className={`p-2 border rounded-xl w-full bg-darkGrey`}
              readOnly={!isEditable.description}
            />
           
          </div>


          <div className="relative">
          <label className="text-blue">Priority</label>
            <input
              {...register("priority")}
              className={`p-2 border rounded-xl w-full bg-darkGrey`}
            
            >
            </input>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-2">
          <div className="relative">
          <label className="text-blue">Category</label>
            <input
              {...register("category")}
              className={`p-2 border rounded-xl w-full bg-darkGrey`}
             
            >
            </input>
          </div>

          <div className="relative">
          <label className="text-blue">Due date</label>
            <input
              {...register("duedate", { valueAsDate: true })}
              placeholder="Due Date"
              className="p-2 border rounded-xl w-full bg-darkGrey"
            />
          </div>
    
          <div className="relative">
          <label className="text-blue">user name</label>
            <input
              {...register("username")}
              placeholder="Username"
              className={`p-2 border rounded-xl w-full bg-darkGrey`}
              readOnly={!isEditable.username}
            />
          </div>

          <div className="relative">
          <label className="text-blue">Completed this task? update status:</label>
            <select
              {...register("status")}
              className={`bg-darkGrey p-2 border rounded-xl w-full ${isEditable.status ? "bg-blue-100" : "bg-grey-100"}`}
         
            >
              <option value="Pending">pending</option>
              <option value="In Progress">in progress</option>
              <option value="Completed">completed</option>
            </select>
          </div>
          <span className="text-red-500">{errors.status?.message}</span>
        </div>
      </div>

      <button type="submit" className="mt-6 bg-green w-28 rounded-lg p-2 text-white hover:bg-green-600">
        Update Status
      </button>
    </form>
  );
};

export default UserTaskDetails;
