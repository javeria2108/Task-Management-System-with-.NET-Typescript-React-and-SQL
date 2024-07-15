import React from "react";
import { TaskDetails } from "../redux/types/TaskState.type";

type UserTasksCardProps= {
  task: TaskDetails;
}

const UserTasksCard: React.FC<UserTasksCardProps> = ({ task }) => {
  return (
    <div
      className="flex flex-row bg-MediumGrey p-4 items-center w-2/3 h-20 rounded-lg m-2 text-white text-lg
    justify-between hover:cursor-pointer"
    >
      <p className="">{task.name}</p>
      <div className="flex flex-row gap-2">
        <p className="p-2 bg-green rounded-lg h-14 min-w-28 text-center m-auto">
          {task.category}
        </p>
        <p
          className="p-2 bg-orange text-yellow rounded-lg
            h-14 min-w-28 text-center m-auto"
        >
          {new Date(task.duedate).toLocaleDateString()}
        </p>
        <p className="p-2 text-pink border-2 border-pink rounded-lg
            h-14 min-w-28 text-center m-auto">{task.priority}</p>
        <p className="p-2 bg-lightPurple text-lightPink rounded-lg
            h-14 min-w-28 text-center m-auto">{task.status}</p>
      </div>
    </div>
  );
};

export default UserTasksCard;
