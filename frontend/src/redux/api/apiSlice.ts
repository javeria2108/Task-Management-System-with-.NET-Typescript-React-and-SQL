import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
    fetchTasksByUser: builder.query({
        query: () => 'tasks/getbyuserid',
      }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useFetchUserQuery, useFetchTasksByUserQuery } = apiSlice;
