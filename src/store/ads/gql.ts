/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { gql } from '@apollo/client';

const query = {
  facebookLeads: gql`
    query facebookLeads($paginator: Paginator) {
      facebookLeads(paginator: $paginator) {
        data {
          id
          fullName
          email
          phone
          createdAt
          source
        }
        totalCount
        pages
      }
    }
  `
};

const mutation = {};

const api = {};

export default {
  query,
  mutation,
  api
};
