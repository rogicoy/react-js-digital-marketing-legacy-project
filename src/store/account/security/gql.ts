/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { gql } from '@apollo/client';

const query = {};

const mutation = {
  deactivateAccount: gql`
    mutation deactivateAccount {
      deactivateAccount {
        status
        info
        data
      }
    }
  `,
  changePassword: gql`
    mutation changePassword($oldPassword: String!, $newPassword: String!) {
      changePassword(input: { oldPassword: $oldPassword, newPassword: $newPassword }) {
        status
        info
        error_message
        data
      }
    }
  `
};

const api = {};

export default {
  query,
  mutation,
  api
};
