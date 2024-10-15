import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import {
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from '@/rtk/api';
import {
  useDeleteMutation,
  useGetQuery,
  usePostMutation,
  useUpdateMutation,
} from '@/rtk/api2';

export default function Rtk() {
//   const res = useGetUserQuery(undefined);
//   const [createPost, res] = useCreatePostMutation();
//   const [updatePost, res] = useUpdatePostMutation();
//   const [deletePost, res] = useDeletePostMutation();

  // get post
  //   const res = useGetQuery({
  //     query: `query {
  //   post(id: 1) {
  //     id
  //     title
  //     body
  //   }
  // }`,
  //   });

  //   const [createPost, res] = usePostMutation();
  //   const [update, res] = useUpdateMutation();
  //   const [deletePost, res] = useDeleteMutation();

  useEffect(() => {
    //     createPost({
    //       query: `mutation (
    //   $input: CreatePostInput!
    // ) {
    //   createPost(input: $input) {
    //     id
    //     title
    //     body
    //   }
    // }`,
    //       variables: {
    //         input: {
    //           title: 'A Very Captivating Post Title',
    //           body: 'Some interesting content.',
    //         },
    //       },
    //     });

    // update
    //     update({
    //       query: `mutation (
    //   $id: ID!,
    //   $input: UpdatePostInput!
    // ) {
    //   updatePost(id: $id, input: $input) {
    //     id
    //     body
    //   }
    // }`,
    //       variables: {
    //         id: 1,
    //         input: {
    //           body: 'Some updated content.',
    //         },
    //       },
    //     });

    // delete
    //     deletePost({
    //       query: `mutation (
    //   $id: ID!
    // ) {
    //   deletePost(id: $id)
    // }`,
    //       variables: {
    //         id: 101,
    //       },
    //     });
  }, []);
  //   console.log(JSON.stringify(res.data));

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text>rtk</Text>
    </View>
  );
}
