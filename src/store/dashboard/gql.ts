/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { gql } from '@apollo/client';

const query = {
  connectedAccounts: gql`
    query connectedAccounts {
      connectedAccounts {
        type
        name
      }
    }
  `,
  campaignSummary: gql`
    query campaignSummary {
      campaignSummary {
        campaignToReview
        activeCampaign
        pauseCampaign
        completedCampaign
      }
    }
  `,
  upcomingScheduledPost: gql`
    query upcomingScheduledPost {
      upcomingScheduledPost {
        postAt
        type
        mediaUrl
        caption
      }
    }
  `,
  accountMetrics: gql`
    query accountMetrics {
      accountMetrics {
        facebook {
          date
          count
        }
        instagram {
          date
          count
        }
        twitter {
          date
          count
        }
      }
    }
  `,
  adAccountSummary: gql`
    query adAccountSummary {
      adAccountSummary {
        name
        spend {
          value
          increase
        }
        impression {
          value
          increase
        }
        reach {
          value
          increase
        }
      }
    }
  `
};

export default {
  query
};
