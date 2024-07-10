import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema, taskSchema } from "../Schemas/TaskSchema";
import { useCreateTaskMutation } from "../redux/api/tasksApi";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/slices/TasksSlice";

export function CreateTaskForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<taskSchema>({
    mode: "all",
    resolver: zodResolver(TaskSchema),
  });

  const [createTask] = useCreateTaskMutation();
  const dispatch = useDispatch();

  const [apiErrors, setApiErrors] = useState<
    { code: string; description: string }[]
  >([]);

  const onSubmit = async (data: taskSchema) => {
    try {
      const task = await createTask(data).unwrap();
      dispatch(addTask(task));
      console.log("Task created successfully: ", task);
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        console.error("Failed to create task: ", (err as { data: any }).data);
        setApiErrors(
          (err as { data: { code: string; description: string }[] }).data
        );
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col bg-lightGrey m-5"
    >
      <h1 className="text-center text-2xl sm:text-3xl text-white">
        Create Task
      </h1>
      <div className="flex flex-row items-center">
        <div className="flex flex-col">
        <input
          {...register("name")}
          placeholder="Task Name"
          className="p-2 border rounded-xl w-3/5 mt-5"
        />
        <span className="text-red-500">{errors && errors.name?.message}</span>

        <textarea
          {...register("description")}
          placeholder="Description"
          className="p-2 border rounded-xl w-3/5 mt-5"
        />
        <span className="text-red-500">
          {errors && errors.description?.message}
        </span>

        <select
          {...register("priority")}
          className="p-2 border rounded-xl w-3/5 mt-5"
        >
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <span className="text-red-500">
          {errors && errors.priority?.message}
        </span>
        </div>
        <div className="flex flex-col">
            
        <input
          {...register("category")}
          placeholder="Category"
          className="p-2 border rounded-xl w-3/5 mt-5"
        />
        <span className="text-red-500">
          {errors && errors.category?.message}
        </span>

        <input
          {...register("duedate", { valueAsDate: true })}
          type="date"
          placeholder="Due Date"
          className="p-2 border rounded-xl w-3/5 mt-5"
        />
        <span className="text-red-500">
          {errors && errors.duedate?.message}
        </span>

        <input
          {...register("username")}
          placeholder="Username"
          className="p-2 border rounded-xl w-3/5 mt-5"
        />
        <span className="text-red-500">
          {errors && errors.username?.message}
        </span>
        </div>
        

      </div>

      <button
        type="submit"
        className="mt-5 bg-green rounded-lg p-2 w-1/3 text-white"
      >
        Create Task
      </button>
      {apiErrors && apiErrors.length > 0 && (
        <div className="text-red-500 p-2">
          {apiErrors.map((error, index) => (
            <p key={index}>{error.description}</p>
          ))}
        </div>
      )}
    </form>
  );
}
