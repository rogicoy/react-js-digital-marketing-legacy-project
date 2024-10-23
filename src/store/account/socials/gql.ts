/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { gql } from '@apollo/client';

const query = {
  facebookPage: gql`
    query facebookPage {
      facebookPage {
        id
        activeName
        activeId
        count
        fbId
        fbName
        fbPic
      }
    }
  `,
  facebookAds: gql`
    query facebookAds {
      facebookAds {
        id
        activeName
        activeId
        count
        fbId
        fbName
        fbPic
        dateConnected
      }
    }
  `,
  pages: gql`
    query pages($socialConnectionId: String!) {
      pages(socialConnectionId: $socialConnectionId) {
        data {
          id
          name
          access_token
        }
      }
    }
  `,
  adAccounts: gql`
    query adAccounts($socialConnectionId: String!) {
      adAccounts(socialConnectionId: $socialConnectionId) {
        data {
          id
          name
        }
      }
    }
  `,
  linkedinAccount: gql`
    query linkedinAccount {
      linkedinAccount {
        id
        linkedinId
        firstName
        lastName
        profilePic
      }
    }
  `,
  linkedinAuthorizationUrl: gql`
    query linkedinAuthorizationUrl {
      linkedinAuthorizationUrl
    }
  `,
  facebookCampaigns: gql`
    query facebookCampaigns($status: CampaignStatus!, $paginator: Paginator) {
      facebookCampaigns(status: $status, paginator: $paginator) {
        data {
          id
          name
          objective
          end_date
          spent
          link
          status
        }
        totalCount
      }
    }
  `,
  facebookAdBrief: gql`
    query facebookAdBrief {
      facebookAdBrief {
        data {
          id
          campaignName
          objective
          endAt
          budget
          status
        }
        totalCount
      }
    }
  `,
  facebookAdResult: gql`
    query facebookAdResult($input: facebookAdResultInput!) {
      facebookAdResult(input: $input) {
        name
        status
        objective
        spend {
          value
          increase
        }
        leads {
          value
          increase
        }
        costPerLead {
          value
          increase
        }
        impressions {
          value
          increase
        }
        frequency {
          value
          increase
        }
        cpc {
          value
          increase
        }
        ctr {
          value
          increase
        }
        reach {
          value
          increase
        }
        clicks {
          value
          increase
        }
        platform
      }
    }
  `,
  facebookAdResultRange: gql`
    query facebookAdResultRange($input: facebookAdResultRangeInput!) {
      facebookAdResultRange(input: $input) {
        spend {
          date
          count
        }
        leads {
          date
          count
        }
        costPerLead {
          date
          count
        }
        impressions {
          date
          count
        }
        frequency {
          date
          count
        }
        cpc {
          date
          count
        }
        ctr {
          date
          count
        }
        reach {
          date
          count
        }
        clicks {
          date
          count
        }
      }
    }
  `,
  facebookAdResultBreakdown: gql`
    query facebookAdResultBreakdown($input: facebookAdResultBreakdownInput!) {
      facebookAdResultBreakdown(input: $input) {
        breakdown
        spend
        impressions
        frequency
        cpc
        ctr
        reach
        clicks
      }
    }
  `,
  facebookPageReport: gql`
    query facebookPageReport {
      facebookPageReport {
        id
        name
        profile
        postCount
        likeCount
        likeIncrease
        report {
          date
          count
        }
      }
    }
  `,
  facebookPageDetails: gql`
    query facebookPageReport {
      facebookPageReport {
        id
        name
        profile
      }
    }
  `,
  instagramPageReport: gql`
    query instagramPageReport {
      instagramPageReport {
        id
        name
        profile
        followerCount
        postCount
        followingCount
        followerIncrease
        report {
          date
          count
        }
      }
    }
  `,
  instagramPageDetails: gql`
    query instagramPageReport {
      instagramPageReport {
        id
        name
        profile
      }
    }
  `,
  instagramConnection: gql`
    query instagramConnection {
      instagramConnection {
        id
        pagesCount
        page {
          id
          name
        }
        instagram {
          id
          name
          pic
        }
      }
    }
  `,
  instagramPages: gql`
    query instagramPages {
      instagramPages {
        data {
          id
          name
          access_token
          is_business_account
        }
      }
    }
  `,
  instagramConnect: gql`
    query instagramConnect {
      instagramConnect
    }
  `,
  twitterConnection: gql`
    query twitterConnection($type: TwitterConnectionType!) {
      twitterConnection(type: $type) {
        id
        name
        username
        profilePic
      }
    }
  `,
  linkedinPageReport: gql`
    query linkedinPageReport {
      linkedinPageReport {
        id
        name
        profile
        postCount
        likeCount
        likeIncrease
        report {
          date
          count
        }
      }
    }
  `,
  linkedinPageDetails: gql`
    query linkedinPageReport {
      linkedinPageReport {
        id
        name
        profile
      }
    }
  `,
  twitterPageDetails: gql`
    query twitterConnection($type: TwitterConnectionType!) {
      twitterConnection(type: $type) {
        id
        name
        username
        profilePic
      }
    }
  `,
  googleConnection: gql`
    query googleConnection {
      googleConnection {
        id
        name
        profilePic
      }
    }
  `,
  mindbodyConnection: gql`
    query mindbodyConnection {
      mindbodyConnection {
        id
        name
        profilePic
      }
    }
  `
};

const mutation = {
  enablePage: gql`
    mutation($input: enablePageInput!) {
      enablePage(input: $input) {
        info
        status
        error_message
      }
    }
  `,
  enableAdAccount: gql`
    mutation($input: enableAdAccountInput!) {
      enableAdAccount(input: $input) {
        info
        status
        error_message
      }
    }
  `,
  instagramEnablePage: gql`
    mutation($input: enablePageInput!) {
      instagramEnablePage(input: $input) {
        info
        status
        error_message
      }
    }
  `,
  disconnectSocialAccount: gql`
    mutation disconnectSocialAccount($provider: SocialConnectionType!) {
      disconnectSocialAccount(provider: $provider) {
        info
        status
      }
    }
  `,
  mindbodyLogin: gql`
    mutation mindbodyLogin($siteId: Int!, $username: String!, $password: String!) {
      mindbodyLogin(siteId: $siteId, username: $username, password: $password) {
        data
        status
        info
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
