/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { gql } from '@apollo/client';
import { TOnboard } from '_mockApis/user-profile/types';
import apolloClient from 'utils/apolloClient';

const query = {
  me: gql`
    query {
      me {
        id
        email
        firstName
        lastName
        avatar
        phone
        company
        website
        intercom
        business {
          id
          userId
          name
          website
          phone
          industries
          timezone
          locations
          tags
          isLeadEnabled
          leadEmails
          abn
          digitalAdsExp
          doRunningAds
          expectations
        }
        isSubscribe
        freeTrialUntil
        onboardingStep
      }
    }
  `
};

const mutation = {
  login: gql`
    mutation($input: AuthInput!) {
      login(input: $input) {
        info
        status
        error_message
      }
    }
  `,
  signup: gql`
    mutation($input: SignupInput!) {
      signup(input: $input) {
        info
        status
        error_message
      }
    }
  `,
  onboardingStep: gql`
    mutation updateProfile($input: UserInput!) {
      updateProfile(input: $input) {
        info
        status
        error_message
      }
    }
  `
};

const api = {
  login: async (email: string, password: string) => {
    const input = { email, password };
    return apolloClient
      .mutate({
        mutation: mutation.login,
        variables: { input }
      })
      .then((res) => {
        if (res.data?.login?.error_message) {
          throw new Error(res.data?.login?.error_message);
        }
        return res;
      });
  },
  signup: async ({
    firstName,
    lastName,
    email,
    password,
    aboutRemoved,
    industry
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    aboutRemoved: string;
    industry: string;
  }) => {
    const input = { firstName, lastName, email, password, aboutRemoved, industry };
    return apolloClient
      .mutate({
        mutation: mutation.signup,
        variables: { input }
      })
      .then((res) => {
        if (res.data?.signup?.error_message) {
          throw new Error(res.data?.signup?.error_message);
        }
        return res;
      });
  },
  updateUserOnboard: async (onboardingStep: TOnboard) => {
    const input = { onboardingStep };
    return apolloClient
      .mutate({
        mutation: mutation.onboardingStep,
        variables: { input }
      })
      .then((res) => {
        if (res.data?.login?.error_message) {
          throw new Error(res.data?.login?.error_message);
        }
        return res;
      });
  },
  me: async () =>
    apolloClient.query({
      query: query.me,
      fetchPolicy: 'network-only'
    })
};

export default {
  query,
  mutation,
  api
};
