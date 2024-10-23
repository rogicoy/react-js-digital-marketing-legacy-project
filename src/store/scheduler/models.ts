/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { ISocialType } from 'types';
import { AppError } from '../common/error/models';

export type GetSchedulerPostsRequest = {
  startDateString: string;
  endDateString: string;
};

export type GetIgPoststRequest = {
  date: string;
};

export type GetFbPoststRequest = {
  date: string;
};

export type GetTwPoststRequest = {
  date: string;
};

export type GetLiPoststRequest = {
  date: string;
};

export type GetAllPoststRequest = {
  date: string;
};

export type GetSchedulerPostsResponse = any[];

export type GetSchedPostsResponse = {
  id: string;
  title: string;
  description: string;
  start: Date;
  end?: Date;
  color: string;
  textColor: string;
  image: string;
  comment?: string;
  locationTag?: string;
  extendedProps: {
    platform: ISocialType;
    status: GetPostStatus;
    link?: string;
    errorMessage?: string;
    mediaType?: GetMediaType;
    mediaFrame?: string;
  };
  editable?: boolean;
};

export type GetPostStatus = 'PENDING' | 'COMPLETED' | 'PUBLISHED' | 'SCHEDULED' | 'FAILED';

export type GetMediaType = 'IMAGE' | 'VIDEO' | 'UNKNOWN';

export type GetIgPostReponse = {
  id: string;
  imageUrl: string;
  caption: string;
  postAt: string;
  locationTags: string;
  firstComment: string;
  status: GetPostStatus;
  link: string;
  errorMessage: string;
  mediaType?: GetMediaType;
  mediaFrame?: string;
};

export type GetFbPostReponse = {
  id: string;
  imageUrl: string;
  caption: string;
  postAt: string;
  locationTags: string;
  firstComment: string | null;
  status: GetPostStatus;
  link: string;
  errorMessage: string;
  mediaType?: GetMediaType;
  mediaFrame?: string;
};

export type GetTwPostReponse = {
  id: string;
  imageUrl: string;
  mediaId: string;
  caption: string;
  postAt: string;
  status: GetPostStatus;
  link: string;
  errorMessage: string;
  mediaType?: GetMediaType;
  mediaFrame?: string;
};

export type GetLiPostReponse = {
  id: string;
  title: string;
  imageUrl: string;
  mediaId: string;
  caption: string;
  postAt: string;
  status: GetPostStatus;
  link: string;
  errorMessage: string;
  mediaType?: GetMediaType;
  mediaFrame?: string;
  originalUrl?: string;
};

export type CreateSchedulerPostRequest = {
  title: string;
  description: string;
  start: string;
  end: string;
};

export type CreateSchedulerIgPostRequest = {
  id: string;
  title?: string;
  image: any;
  description: string;
  start: Date;
  end?: Date;
  color?: string;
  textColor?: string;
  extendedProps: {
    platform: ISocialType;
  };
};

export type CreateSchedulerFbPostRequest = {
  id: string;
  title?: string;
  image: any;
  description: string;
  start: Date;
  end?: Date;
  color?: string;
  textColor?: string;
  extendedProps: {
    platform: ISocialType;
  };
};

export type CreateSchedulerPostResponse = {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
};

export type SchedulerState = {
  requests: GetSchedulerPostsRequest[];
  response: GetSchedPostsResponse[];
  errors: AppError[];
  openSuccess: {
    open: boolean;
    active: ISocialType | null;
  };
  openPost: boolean;
  editPost: boolean;
  openEditor: boolean;
  cleared: boolean;
  posts: any[];
  lastCreatedPost: null | CreateSchedulerPostResponse;
};
