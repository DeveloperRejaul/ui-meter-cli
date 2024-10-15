/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userQuery = `query {
            userById(id: 2) {
                id
                name
                email
                phone
            }
            }`;

const createPost = `mutation {
                createPost(post: {
                  title: "Lorem Ipsum",
                  body: "Lorem Ipsum is simply dummy text.",
                  userId: 1
                }) {
                  id
                  title
                  body
                }
              }`;

const updatePost = `mutation {
  updatePost(postId: 1, post: {
    title: "Lorem Ipsum"
  }) {
    id
    title
    body
  }
}
`;

const deletePost = `mutation {
  deletePost(postId: 1)
}`;

const BASE_URL = 'https://graphqlplaceholder.vercel.app/';
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: '/graphql',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          query: userQuery,
          variable: {},
        },
      }),
    }),

    createPost: builder.mutation({
      query: () => ({
        url: '/graphql',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          query: createPost,
          variable: {},
        },
      }),
    }),

    updatePost: builder.mutation({
      query: () => ({
        url: '/graphql',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          query: updatePost,
          variable: {},
        },
      }),
    }),

    deletePost: builder.mutation({
      query: () => ({
        url: '/graphql',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          query: deletePost,
          variable: {},
        },
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = api;
