/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { To } from 'react-router-dom';
import { AudienceFilter, ISocialType } from 'types';
import { IDateRange } from 'ui-component/date-range-picker';
import { TFbSummaryLabels, TReportsInfo, TSocialInfo } from './types';

export interface IMainInsight {
  facebook: IFacebookPage | null;
  instagram: IInstagramPage | null;
  twitter: ITwitterPage | null;
  linkedIn: ILinkedInPage | null;
  dateRange: IDateRange;
}

// social dropdown interface
export interface ISocialMenuItems {
  id: string;
  label: string;
  social: ISocialType;
  socialId: string;
  socialPic?: string;
  order: number;
}

export interface IFacebookPage {
  id: string;
  name: string;
  profile: string;
  postCount: number;
  likeCount: number;
  likeIncrease: number;
  report: IReportsPage[];
}

export interface ITwitterPage {
  id: string;
  name: string;
  username: string;
  profilePic: string;
  report: {
    followersCount: number;
    followingCount: number;
    tweetCount: number;
    followersReport: IReportsPage[];
  };
}

export interface ILinkedInPage {
  id: string;
  name: string;
  profile: string;
  followerCount: number;
  postCount: number;
  followingCount: number;
  followerIncrease: number;
  report: IReportsPage[];
}

export interface ISocialInfo {
  sTitle: TSocialInfo;
  sValue: number;
}

export interface IReports {
  rTitle: TReportsInfo;
  rTo: To;
}

export interface IGrowth {
  gDate?: Date;
  gCount: number;
}

export interface IGraphCard {
  title: string;
  value: number;
  img: string;
  social: ISocialType;
  socialName: string;
  socialInfo: ISocialInfo[];
  growthReport: IReportsPage[];
  link: To;
  report: IReports[];
  connected: boolean;
}

export interface IAudienceChart {
  title: string;
  value?: number;
  color: string;
}

export interface IAudienceCard {
  mainTitle: string;
  initialActiveItem?: AudienceFilter;
  audienceChart: IAudienceChart;
  filters: {
    title: string;
    type: AudienceFilter;
  }[];
  dateRange?: IDateRange;
  disabled?: boolean;
}

export interface ILikePosts {
  image: string;
  date: Date;
  caption: string;
  like: number;
  comment: number;
  share: number;
  save: number;
}

export interface IReportsPage {
  date: Date;
  count: number;
}
export interface IInstagramPage {
  id: string;
  name: string;
  profile: string;
  followerCount: number;
  postCount: number;
  followingCount: number;
  followerIncrease: number;
  report: IReportsPage[];
}

export interface IIgPostPerformance {
  id: string;
  caption: string;
  url: string;
  like: number;
  comment: string;
  engage: number;
  impression: number;
  reach: number;
  saved: number;
  createdAt: Date;
}

export interface IIgStoryPerformance {
  id: string;
  url: string;
  impression: number;
  reach: number;
  replies: number;
  back: number;
  forward: number;
  exits: number;
  createdAt: Date;
}

export interface IFbPageSummary {
  postReach: number;
  postEngagement: number;
  videoViews: number;
  storyReach: number;
  actionOnPage: number;
  pageViews: number;
  pageLikes: number;
  newFollowers: number;
}

export interface IFbPageSummaryArray {
  value: number;
  label: TFbSummaryLabels;
}

export interface IFbTopPosts {
  url: string;
  thumbnail: string;
  mediaType: string;
  postDate: Date;
  caption: string;
  clickCount: number;
  reactionCount: number;
  engageCount: number;
  reachCount: number;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  viewCount: number;
}
