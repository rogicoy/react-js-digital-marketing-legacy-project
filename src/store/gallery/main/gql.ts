/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { gql } from '@apollo/client';
import apolloClient from 'utils/apolloClient';
import { GalleryMediasApiRequest } from './models';

const query = {
  getMediaById: gql`
    query mediaById($id: String!) {
      mediaById(id: $id) {
        id
        name
        description
        caption
        type
        media
        mediaFrame
        size
        link
        status
        tags
        source
        createdAt
      }
    }
  `,
  getMedias: gql`
    query GET_MEDIAS($filter: MediaFilterInput, $paginator: Paginator) {
      mediaList(filter: $filter, paginator: $paginator) {
        data {
          id
          name
          type
          media
          size
          link
          tags
          status
          source
          createdAt
          caption
        }
        pages
        perPage
        totalCount
      }
    }
  `,
  getAccountTags: gql`
    query GET_ACCOUNT_TAGS {
      mediaTagList {
        id
        tag
      }
    }
  `
};

const mutation = {
  deleteMedias: gql`
    mutation DELETE_MEDIAS($mediaIds: [String]!) {
      mediaDelete(mediaIds: $mediaIds) {
        status
        info
        error_message
        data
      }
    }
  `,
  addAccountTag: gql`
    mutation ADD_ACCOUNT_TAG($tag: String!) {
      mediaAddTag(tag: $tag) {
        status
        info
        error_message
        data
      }
    }
  `,
  deleteAccountTag: gql`
    mutation DELETE_ACCOUNT_TAG($id: String!) {
      mediaDeleteTag(id: $id) {
        status
        info
        error_message
        data
      }
    }
  `,
  addMediaTag: gql`
    mutation ADD_MEDIA_TAG($mediaIds: [String]!, $tags: [String]!) {
      mediaTagMedia(mediaIds: $mediaIds, tags: $tags) {
        status
        info
        error_message
        data
      }
    }
  `,
  deleteMediaTag: gql`
    mutation DELETE_MEDIA_TAG($mediaIds: [String]!, $tags: [String]!) {
      mediaUntagMedia(mediaIds: $mediaIds, tags: $tags) {
        status
        info
        error_message
        data
      }
    }
  `,
  updateMedia: gql`
    mutation mediaSave($id: String, $input: mediaInput) {
      mediaSave(id: $id, input: $input) {
        status
        info
        error_message
        data
      }
    }
  `
};

const getMedias = async (request: GalleryMediasApiRequest) =>
  apolloClient
    .query({
      query: query.getMedias,
      fetchPolicy: 'network-only',
      variables: {
        filter: request.filter,
        paginator: request.paginator
      }
    })
    .then((res: any) => {
      if (res.errors) {
        throw new Error(res.errors[0].message);
      }
      return res;
    });

const deleteMedias = async (mediaIds: string[]) =>
  apolloClient
    .mutate({
      mutation: mutation.deleteMedias,
      variables: {
        mediaIds
      }
    })
    .then((res: any) => {
      if (res.errors) {
        throw new Error(res.errors[0].message);
      }

      return res;
    });

const getAccountTags = async () =>
  apolloClient
    .query({
      query: query.getAccountTags,
      fetchPolicy: 'network-only'
    })
    .then((res: any) => {
      if (res.errors) {
        throw new Error(res.errors[0].message);
      }
      return res;
    });

const addAccountTag = async (tag: string) =>
  apolloClient
    .mutate({
      mutation: mutation.addAccountTag,
      variables: {
        tag
      }
    })
    .then((res: any) => {
      if (res.errors) {
        throw new Error(res.errors[0].message);
      }

      return res;
    });

const deleteAccountTag = async (id: string) =>
  apolloClient
    .mutate({
      mutation: mutation.deleteAccountTag,
      variables: {
        id
      }
    })
    .then((res: any) => {
      if (res.errors) {
        throw new Error(res.errors[0].message);
      }

      return res;
    });

const addMediaTag = async (mediaIds: string[], tags: string[]) =>
  apolloClient
    .mutate({
      mutation: mutation.addMediaTag,
      variables: {
        mediaIds,
        tags
      }
    })
    .then((res: any) => {
      if (res.errors) {
        throw new Error(res.errors[0].message);
      }

      return res;
    });

const deleteMediaTag = async (mediaIds: string[], tags: string[]) =>
  apolloClient
    .mutate({
      mutation: mutation.deleteMediaTag,
      variables: {
        mediaIds,
        tags
      }
    })
    .then((res: any) => {
      if (res.errors) {
        throw new Error(res.errors[0].message);
      }

      return res;
    });

const api = {
  getMedias,
  deleteMedias,
  getAccountTags,
  addAccountTag,
  deleteAccountTag,
  addMediaTag,
  deleteMediaTag
};

export default {
  query,
  mutation,
  api
};
