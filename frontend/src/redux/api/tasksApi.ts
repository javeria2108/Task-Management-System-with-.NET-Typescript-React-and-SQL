import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TaskDetails } from '../types/TaskState.type';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5068/api/' }),
  endpoints: (builder) => ({
    getTasksByUsername: builder.query<TaskDetails[], string>({
      query: (username) => `tasks/user/${username}`,
    }),
    getAllTasks: builder.query<TaskDetails[], void>({
        query: () => `tasks`,
      }),
    createTask: builder.mutation ({
        query:(task)=>({
            url:'tasks',
            method: 'POST',
            body: task
        })
    }),
  }),
});

export const { useGetTasksByUsernameQuery, useGetAllTasksQuery, useCreateTaskMutation } = taskApi;
