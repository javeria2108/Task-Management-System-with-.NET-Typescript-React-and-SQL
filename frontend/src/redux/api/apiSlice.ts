import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TaskDetailsDto } from '../slices/TasksSlice';
import { UserProfileSchema } from '../../Users/types/UserProfileSchema';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5068/api/' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: 'account/register',
        method: 'POST',
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: 'account/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    fetchUser: builder.query({
      query: () => 'account/me',
    }),
    getTasksByUsername: builder.query<TaskDetailsDto[], string>({
        query: (username) => `tasks/user/${username}`,
      }),
      getUserProfile: builder.query<UserProfileSchema, string>({
        query: (userId) => `profile/${userId}`,
      }),
      setUserProfile: builder.mutation<UserProfileSchema, Partial<UserProfileSchema> & { userId: string }>({
        query: ({ userId, ...patch }) => ({
          url: `profile/${userId}`,
          method: 'PUT',
          body: patch,
        }),
  }),
}),
});

export const { useRegisterUserMutation, useLoginUserMutation, useFetchUserQuery,  useGetTasksByUsernameQuery,useGetUserProfileQuery, useSetUserProfileMutation} = apiSlice;
