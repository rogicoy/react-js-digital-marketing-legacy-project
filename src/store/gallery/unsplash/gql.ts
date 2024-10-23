/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { gql } from '@apollo/client';
import apolloClient from 'utils/apolloClient';
import { UnsplashApiRequest, UnsplashUploadApiRequest } from './models';

const query = {
  getImages: gql`
    query GET_IMAGES($filter: UnsplashFilterInput) {
      unsplash(filter: $filter)
    }
  `
};

const mutation = {
  uploadImage: gql`
    mutation UPLOAD_IMAGE($link: String!) {
      mediaURLUploader(link: $link) {
        status
        info
        error_message
        data
      }
    }
  `
};

const getImages = async (request: UnsplashApiRequest) =>
  apolloClient
    .query({
      query: query.getImages,
      fetchPolicy: 'network-only',
      variables: {
        filter: request.filter
      }
    })
    .then((res: any) => {
      if (res.errors) {
        throw new Error(res.errors[0].message);
      }
      return res;
    });

const uploadImage = async (request: UnsplashUploadApiRequest) =>
  apolloClient
    .mutate({
      mutation: mutation.uploadImage,
      variables: {
        link: request.link
      }
    })
    .then((res: any) => {
      if (res.errors) {
        throw new Error(res.errors[0].message);
      }
      return res;
    });

const api = {
  getImages,
  uploadImage
};

export default {
  query,
  mutation,
  api
};
