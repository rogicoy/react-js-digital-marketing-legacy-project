/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { gql } from '@apollo/client';
import apolloClient from 'utils/apolloClient';
import { GetFbPoststRequest, GetIgPoststRequest, GetTwPoststRequest, GetLiPoststRequest } from './models';

const query = {
  instagramSchedulePost: gql`
    query($date: DateTime!) {
      instagramSchedulePost(date: $date) {
        data {
          id
          imageUrl
          caption
          postAt
          locationTags
          firstComment
          status
          link
          errorMessage
          mediaType
          mediaFrame
        }
      }
    }
  `,
  instagramSchedulePostById: gql`
    query($id: String!) {
      instagramSchedulePostById(id: $id) {
        id
        imageUrl
        caption
        postAt
        locationTags
        firstComment
        status
        link
        errorMessage
        mediaType
        mediaFrame
      }
    }
  `,
  instagramSchedulePostByIdImage: gql`
    query($id: String!) {
      instagramSchedulePostById(id: $id) {
        imageUrl
      }
    }
  `,
  facebookSchedulePost: gql`
    query($date: DateTime!) {
      facebookSchedulePost(date: $date) {
        data {
          id
          imageUrl
          caption
          postAt
          locationTags
          firstComment
          status
          link
          errorMessage
          mediaType
          mediaFrame
        }
      }
    }
  `,
  facebookSchedulePostById: gql`
    query($id: String!) {
      facebookSchedulePostById(id: $id) {
        id
        imageUrl
        caption
        postAt
        locationTags
        firstComment
        status
        link
        errorMessage
        mediaType
        mediaFrame
      }
    }
  `,
  facebookSchedulePostByIdImage: gql`
    query($id: String!) {
      facebookSchedulePostById(id: $id) {
        imageUrl
      }
    }
  `,
  twitterSchedulePost: gql`
    query($date: DateTime!) {
      twitterSchedulePost(date: $date) {
        data {
          id
          imageUrl
          mediaId
          mediaType
          mediaFrame
          caption
          postAt
          status
          link
          errorMessage
        }
      }
    }
  `,
  twitterSchedulePostById: gql`
    query($id: String!) {
      twitterSchedulePostById(id: $id) {
        id
        imageUrl
        mediaId
        mediaType
        mediaFrame
        caption
        postAt
        status
        link
        errorMessage
      }
    }
  `,
  twitterSchedulePostByIdImage: gql`
    query($id: String!) {
      twitterSchedulePostById(id: $id) {
        imageUrl
      }
    }
  `,
  linkedinSchedulePost: gql`
    query($date: DateTime!) {
      linkedinSchedulePost(date: $date) {
        data {
          id
          title
          imageUrl
          mediaId
          mediaType
          mediaFrame
          caption
          postAt
          status
          link
          originalUrl
          errorMessage
        }
      }
    }
  `,
  linkedinSchedulePostById: gql`
    query($id: String!) {
      linkedinSchedulePostById(id: $id) {
        id
        title
        imageUrl
        mediaId
        mediaType
        mediaFrame
        caption
        postAt
        status
        link
        originalUrl
        # errorMessage
      }
    }
  `,
  linkedinSchedulePostByIdImage: gql`
    query($id: String!) {
      twitterSchedulePostById(id: $id) {
        imageUrl
      }
    }
  `
};

const mutation = {
  instagramSchedulePost: gql`
    mutation($id: String, $input: instagramSchedulePostInput!) {
      instagramSchedulePost(id: $id, input: $input) {
        info
        status
        error_message
        data
      }
    }
  `,
  instagramDeleteSchedulePost: gql`
    mutation($id: String!) {
      instagramDeleteSchedulePost(id: $id) {
        info
        status
        error_message
        data
      }
    }
  `,
  facebookSchedulePost: gql`
    mutation($id: String, $input: facebookSchedulePostInput!) {
      facebookSchedulePost(id: $id, input: $input) {
        info
        status
        error_message
        data
      }
    }
  `,
  facebookDeleteSchedulePost: gql`
    mutation($id: String!) {
      facebookDeleteSchedulePost(id: $id) {
        info
        status
        error_message
        data
      }
    }
  `,
  twitterSchedulePost: gql`
    mutation($id: String, $input: TwitterSchedulePostInput!) {
      twitterSchedulePost(id: $id, input: $input) {
        info
        status
        error_message
        data
      }
    }
  `,
  twitterDeleteSchedulePost: gql`
    mutation($id: String!) {
      twitterDeleteSchedulePost(id: $id) {
        info
        status
        error_message
        data
      }
    }
  `,
  linkedinSchedulePost: gql`
    mutation($id: String, $input: linkedinSchedulePostInput!) {
      linkedinSchedulePost(id: $id, input: $input) {
        info
        status
        error_message
        data
      }
    }
  `,
  linkedinDeleteSchedulePost: gql`
    mutation($id: String!) {
      linkedinDeleteSchedulePost(id: $id) {
        info
        status
        error_message
        data
      }
    }
  `
};

const api = {
  getIgPosts: async (request: GetIgPoststRequest) =>
    apolloClient
      .query({
        query: query.instagramSchedulePost,
        fetchPolicy: 'network-only',
        variables: {
          date: request.date
        }
      })
      .then((res: any) => {
        if (res.errors) {
          throw new Error(res.errors[0].message);
        }
        return res;
      }),
  getFbPosts: async (request: GetFbPoststRequest) =>
    apolloClient
      .query({
        query: query.facebookSchedulePost,
        fetchPolicy: 'network-only',
        variables: {
          date: request.date
        }
      })
      .then((res: any) => {
        if (res.errors) {
          throw new Error(res.errors[0].message);
        }
        return res;
      }),
  getTwPosts: async (request: GetTwPoststRequest) =>
    apolloClient
      .query({
        query: query.twitterSchedulePost,
        fetchPolicy: 'network-only',
        variables: {
          date: request.date
        }
      })
      .then((res: any) => {
        if (res.errors) {
          throw new Error(res.errors[0].message);
        }
        return res;
      }),
  getLiPosts: async (request: GetLiPoststRequest) =>
    apolloClient
      .query({
        query: query.linkedinSchedulePost,
        fetchPolicy: 'network-only',
        variables: {
          date: request.date
        }
      })
      .then((res: any) => {
        if (res.errors) {
          throw new Error(res.errors[0].message);
        }
        return res;
      })
};

export default {
  query,
  mutation,
  api
};
