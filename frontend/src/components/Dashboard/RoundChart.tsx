import React from 'react';
import { TaskDetails } from '../../redux/types/TaskState.type';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const RoundChartCard: React.FC<{ tasks: TaskDetails[] }> = ({ tasks }) => {
    console.log(tasks)
  const taskStatuses = {
    completed: tasks.filter(task => task.status == 'Completed').length,
    inProgress: tasks.filter(task => task.status == 'In Progress').length,
    pending: tasks.filter(task => task.status == 'pending').length,
  };
console.log(taskStatuses.pending)
console.log(taskStatuses.inProgress)
  const data = [
    { name: 'Completed', value: taskStatuses.completed },
    { name: 'In Progress', value: taskStatuses.inProgress },
    { name: 'Pending', value: taskStatuses.pending },
  ];

  const COLORS = ['#05CC95', '#2DBEF5','#FFC100'];

  return (
    <div className="bg-darkGrey p-4 rounded-lg shadow">
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
    </div>
  );
};

export default RoundChartCard;
