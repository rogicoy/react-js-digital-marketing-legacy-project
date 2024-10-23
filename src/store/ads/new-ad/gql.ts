/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import apolloClient from 'utils/apolloClient';
import { FacebookCampaign } from './models';
import { gql } from '@apollo/client';

const query = {
  getFacebookLocation: gql`
    query facebookLocations($search: String!) {
      facebookLocations(search: $search) {
        label
        value
      }
    }
  `
};

const mutation = {
  createFacebookCampaign: gql`
    mutation facebookCampaign($input: facebookCampaignInput!) {
      facebookCampaign(input: $input) {
        status
        info
        error_message
        data
      }
    }
  `,
  updateFacebookCampaign: gql`
    mutation facebookCampaign($id: String, $input: facebookCampaignInput!) {
      facebookCampaign(id: $id, input: $input) {
        status
        info
        error_message
        data
      }
    }
  `,
  createFacebookAdBrief: gql`
    mutation facebookAdBrief($id: String, $input: facebookAdBriefInput!) {
      facebookAdBrief(id: $id, input: $input) {
        status
        info
        error_message
        data
      }
    }
  `,
  createFacebookAdBriefAudience: gql`
    mutation facebookAdBriefAudience($input: facebookAdBriefAudienceInput!) {
      facebookAdBriefAudience(input: $input) {
        status
        info
        error_message
        data
      }
    }
  `,
  createFacebookAdBriefAds: gql`
    mutation facebookAdBriefAds($input: facebookAdBriefAdsInput!) {
      facebookAdBriefAds(input: $input) {
        status
        info
        error_message
        data
      }
    }
  `
};

const createFacebookCampaign = async (data: FacebookCampaign) =>
  apolloClient.mutate({ mutation: mutation.createFacebookCampaign, variables: { input: data } }).then((res: any) => {
    if (res.errors) {
      throw new Error(res.errors[0].message);
    }

    return res;
  });

const updateFacebookCampaign = async (id: string, data: FacebookCampaign) =>
  apolloClient.mutate({ mutation: mutation.updateFacebookCampaign, variables: { id, input: data } }).then((res: any) => {
    if (res.errors) {
      throw new Error(res.errors[0].message);
    }

    return res;
  });

const api = {
  createFacebookCampaign,
  updateFacebookCampaign
};

export default {
  query,
  mutation,
  api
};
