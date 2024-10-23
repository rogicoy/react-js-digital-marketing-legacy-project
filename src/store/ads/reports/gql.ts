/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { gql } from '@apollo/client';
import apolloClient from 'utils/apolloClient';

const query = {
  getReports: gql`
    query GET_REPORTS {
      facebookCampaignReports {
        data {
          id
          name
          image
          link
          startDate
          endDate
          totalSpent
          impressions
          clicks
          reach
          frequency
          cpr
          status
        }
      }
    }
  `,
  getFacebookCampaignReports: gql`
    query facebookCampaignReports($paginator: Paginator) {
      facebookCampaignReports(paginator: $paginator) {
        data {
          spent
          impression
          reach
          frequency
          ctr
          cpc
          cpl
          totalClick
          totalLead
        }
      }
    }
  `
};

const mutation = {};

const getReports = async () =>
  apolloClient
    .query({
      query: query.getReports,
      fetchPolicy: 'network-only'
    })
    .then((res: any) => {
      if (res.errors) {
        throw new Error(res.errors[0].message);
      }
      return res;
    });

const getFacebookCampaignReports = async () =>
  apolloClient
    .query({
      query: query.getFacebookCampaignReports,
      fetchPolicy: 'network-only'
    })
    .then((res: any) => {
      if (res.errors) {
        throw new Error(res.errors[0].message);
      }
      return res;
    });

const api = {
  getReports,
  getFacebookCampaignReports
};

export default {
  query,
  mutation,
  api
};
