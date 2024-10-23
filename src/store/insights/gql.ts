/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { gql } from '@apollo/client';

const query = {
  facebookPostPerformance: gql`
    query facebookPostPerformance($paginator: Paginator) {
      facebookPostPerformance(paginator: $paginator) {
        data {
          id
          message
          createdTime
          fullPicture
          reach
          engagement
          reactions
          clicks
        }
        pages
        totalCount
      }
    }
  `,
  facebookPageSummary: gql`
    query facebookPageSummary($paginator: Paginator) {
      facebookPageSummary(paginator: $paginator) {
        postReach
        postEngagement
        videoViews
        storyReach
        actionOnPage
        pageViews
        pageLikes
        newFollowers
      }
    }
  `,
  facebookTopPosts: gql`
    query facebookTopPosts($filterType: TopPostsFilter!) {
      facebookTopPosts(filterType: $filterType) {
        data {
          url
          thumbnail
          mediaType
          postDate
          caption
          clickCount
          reactionCount
          engageCount
          reachCount
          likeCount
          commentCount
          shareCount
          viewCount
        }
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
  instagramPostPerformance: gql`
    query instagramPostPerformance {
      instagramPostPerformance {
        data {
          id
          caption
          url
          like
          comment
          engage
          impression
          reach
          saved
          createdAt
        }
        pages
        totalCount
      }
    }
  `,
  instagramStoryPerformance: gql`
    query instagramStoryPerformance {
      instagramStoryPerformance {
        data {
          id
          url
          impression
          reach
          replies
          back
          forward
          exits
          createdAt
        }
        pages
        totalCount
      }
    }
  `,
  instagramSummary: gql`
    query instagramSummary {
      instagramSummary {
        bestTimeToPost
        likesCount
        commentsCount
        sharesCount
        savesCount
        postCount
        storiesCount
        reelsCount
      }
    }
  `,
  instagramAudience: gql`
    query instagramAudience($filterType: AudienceFilter!, $dateRange: DateRange) {
      instagramAudience(filterType: $filterType, dateRange: $dateRange) {
        total
        data {
          label
          value
        }
      }
    }
  `,
  instagramFollowers: gql`
    query instagramFollowers($dateRange: DateRange) {
      instagramFollowers(dateRange: $dateRange) {
        followerCount
        postCount
        followingCount
        report {
          date
          count
        }
      }
    }
  `,
  instagramTopPosts: gql`
    query instagramTopPosts($filterType: TopPostsFilter!) {
      instagramTopPosts(filterType: $filterType) {
        data {
          url
          mediaType
          postDate
          caption
          likeCount
          commentCount
          savedCount
          engageCount
        }
      }
    }
  `,
  twitterPerformance: gql`
    query twitterPerformance($dateRange: DateRange) {
      twitterPerformance(input: { dateRange: $dateRange }) {
        retweetCount
        likesCount
        profileClickCount
        impressionCount
        tweetCount
        profileViewCount
      }
    }
  `,
  twitterTweets: gql`
    query twitterTweets($input: TwitterTweetInput) {
      twitterTweets(input: $input) {
        data {
          id
          caption
          link
          url
          retweetCount
          replyCount
          likeCount
          linkClickCount
          profileClickCount
          impressionCount
          engagementCount
          postDate
        }
      }
    }
  `,
  getLinkedInOverview: gql`
    query linkedinData {
      linkedinData {
        numberOfLike
        numberOfShare
        numberOfComment
        numberOfLinkClick
        totalPost
        numberOfProfileVisit
        numberOfConnection
      }
    }
  `,
  getLinkedInUpdates: gql`
    query linkedinOrganicInsights($dateStart: DateTime!, $dateEnd: DateTime!) {
      linkedinOrganicInsights(dateStart: $dateStart, dateEnd: $dateEnd) {
        thumbnail
        postDate
        caption
        impressionCount
        shareCount
        commentCount
        reactionCount
        clickCount
        ctrCount
        engagementRateCount
      }
    }
  `,
  getLinkedInTopPosts: gql`
    query linkedinTopPosts($filterType: TopPostsFilter!) {
      linkedinTopPosts(filterType: $filterType) {
        data {
          caption
          mediaType
          postDate
          url
          thumbnail
          description
          originalUrl
          title
          likeCount
          commentCount
        }
      }
    }
  `
};

export default {
  query
};
