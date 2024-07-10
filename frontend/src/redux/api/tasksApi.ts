import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TaskDetails } from '../types/TaskState.type';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5068/api/' }),
  endpoints: (builder) => ({
    getTasksByUsername: builder.query<TaskDetails[], string>({
      query: (username) => `tasks/user/${username}`,
    }),
  }),
});

export const { useGetTasksByUsernameQuery } = taskApi;
