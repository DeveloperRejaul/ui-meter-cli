/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api2 = createApi({
  reducerPath: 'api2',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://graphqlzero.almansi.me',
    headers: { 'Content-Type': 'application/json' },
  }),
  endpoints: (builder) => ({
    get: builder.query({
      query: ({ query, variables }) => ({
        url: '/api',
        method: 'POST',
        body: {
          query,
          variables,
        },
      }),
    }),
    post: builder.mutation({
      query: ({ query, variables }) => ({
        url: '/api',
        method: 'POST',
        body: {
          query,
          variables,
        },
      }),
    }),

    update: builder.mutation({
      query: ({ query, variables }) => ({
        url: '/api',
        method: 'POST',
        body: {
          query,
          variables,
        },
      }),
    }),

    delete: builder.mutation({
      query: ({ query, variables }) => ({
        url: '/api',
        method: 'POST',
        body: {
          query,
          variables,
        },
      }),
    }),
  }),
});

export const {
  useDeleteMutation,
  useGetQuery,
  usePostMutation,
  useUpdateMutation,
} = api2;
