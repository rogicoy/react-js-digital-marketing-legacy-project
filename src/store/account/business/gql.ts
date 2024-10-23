/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { gql } from '@apollo/client';

const query = {};

const mutation = {
  businessProfile: gql`
    mutation businessProfile($input: businessProfileInput!) {
      businessProfile(input: $input) {
        info
        status
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
