import React from 'react';
import { TaskDetails } from '../../redux/types/TaskState.type';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const RoundChartCard: React.FC<{ tasks: TaskDetails[] }> = ({ tasks }) => {
  console.log(tasks);

  const taskStatuses = {
    completed: tasks.filter(task => task.status.trim().toLowerCase() === 'completed').length,
    inProgress: tasks.filter(task => task.status.trim().toLowerCase() === 'in progress').length,
    pending: tasks.filter(task => task.status.trim().toLowerCase() === 'pending').length,
  };

  console.log("Pending:", taskStatuses.pending);
  console.log("In Progress:", taskStatuses.inProgress);
  console.log("Completed:", taskStatuses.completed);

  const data = [
    { name: 'Completed', value: taskStatuses.completed },
    { name: 'In Progress', value: taskStatuses.inProgress },
    { name: 'Pending', value: taskStatuses.pending },
  ];

  const COLORS = ['#05CC95', '#2DBEF5', '#FFC100'];

  return (
    <div className="bg-darkGrey p-4 rounded-lg shadow max-w-80">
      <h2 className="text-lg text-white font-bold mb-2">Tasks Status</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={80} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-start items-center mt-4">
        <div className="flex items-center mr-4">
          <div className="w-4 h-4 mr-2" style={{ backgroundColor: COLORS[0] }}></div>
          <span className="text-white">Completed</span>
        </div>
        <div className="flex items-center mr-4">
          <div className="w-4 h-4 mr-2" style={{ backgroundColor: COLORS[1] }}></div>
          <span className="text-white">In Progress</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2" style={{ backgroundColor: COLORS[2] }}></div>
          <span className="text-white">Pending</span>
        </div>
      </div>
    </div>
  );
};

export default RoundChartCard;
