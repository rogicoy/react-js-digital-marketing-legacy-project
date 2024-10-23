/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { gql } from '@apollo/client';
import apolloClient from 'utils/apolloClient';
import { SelectMediasApiRequest } from './models';

const query = {
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
        }

        pages
        perPage
        totalCount
      }
    }
  `
};

const getSelectMedias = async (request: SelectMediasApiRequest) =>
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

const api = {
  getSelectMedias
};

export default {
  query,
  api
};
