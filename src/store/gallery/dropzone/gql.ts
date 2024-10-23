/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { gql } from '@apollo/client';
import apolloClient from 'utils/apolloClient';

const query = {};

const mutation = {
  uploadFile: gql`
    mutation MEDIA_UPLOAD($file: Upload!) {
      mediaUploader(file: $file) {
        status
        info
        error_message
        data
      }
    }
  `
};

const uploadFile = async (ref: string, file: File) =>
  apolloClient.mutate({ mutation: mutation.uploadFile, variables: { file } }).then((res: any) => {
    const { error_message } = res.data.mediaUploader;

    if (error_message) {
      throw new Error(error_message);
    }

    return { ...res.data.mediaUploader, id: ref };
  });

const api = {
  uploadFile
};

export default {
  query,
  mutation,
  api
};
