/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { gql } from '@apollo/client';
import apolloClient from 'utils/apolloClient';

type UserInput = {
  firstName: String;
  lastName: String;
  email: String;
  avatar: unknown;
  phone: String;
  company: String;
  website: String;
};

const query = {
  stripePlanList: gql`
    query stripePlanList($type: PlanType!) {
      stripePlanList(type: $type) {
        name
        description
        images
        metadata
        prices {
          id
          amount
          currency
        }
      }
    }
  `
};

const mutation = {
  updateProfile: gql`
    mutation updateProfile($input: UserInput!) {
      updateProfile(input: $input) {
        info
        status
        error_message
      }
    }
  `,
  subscribe: gql`
    mutation subscribe($input: SubscribeInput!) {
      subscribe(input: $input) {
        status
        info
        error_message
        data
      }
    }
  `
};

const api = {
  updateProfile: async (input: UserInput) =>
    apolloClient
      .mutate({
        mutation: mutation.updateProfile,
        variables: { input }
      })
      .then((res) => {
        if (res.data?.updateProfile?.error_message) {
          throw new Error(res.data?.updateProfile?.error_message);
        }
        return res;
      })
};

export default {
  query,
  mutation,
  api
};
