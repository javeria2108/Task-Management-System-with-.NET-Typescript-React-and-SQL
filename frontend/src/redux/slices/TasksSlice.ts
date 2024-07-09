import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TaskDetailsDto {
    id: number;
    name: string;
    description: string;
    priority: string;
    category: string;
    duedate: Date;
    status: string;
  }

export interface TasksState {
  tasks: TaskDetailsDto[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<TaskDetailsDto[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<TaskDetailsDto>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<TaskDetailsDto>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
