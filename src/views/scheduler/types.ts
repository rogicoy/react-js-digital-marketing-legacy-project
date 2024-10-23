/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import {
  CreateSchedulerIgPostRequest,
  CreateSchedulerFbPostRequest,
  CreateSchedulerPostRequest,
  GetSchedulerPostsRequest,
  SchedulerState,
  GetIgPoststRequest,
  GetFbPoststRequest,
  GetMediaType,
  GetTwPoststRequest,
  GetLiPoststRequest
} from 'store/scheduler/models';
import { ISocialType } from 'types';

export interface IScheduler {
  state: SchedulerState;
  doGetSchedulerPosts: (request: GetSchedulerPostsRequest) => void;
  doGetIgPosts: (request: GetIgPoststRequest) => void;
  doGetFbPosts: (request: GetFbPoststRequest) => void;
  doGetTwPosts: (request: GetTwPoststRequest) => void;
  doGetLiPosts: (request: GetLiPoststRequest) => void;
  doCreateSchedulerPost: (request: CreateSchedulerPostRequest) => void;
  doCreateSchedulerIgPost: (request: CreateSchedulerIgPostRequest) => void;
  doCreateSchedulerFbPost: (request: CreateSchedulerFbPostRequest) => void;
  doOpenPostDialog: (open: boolean) => void;
  doOpenSuccessDialog: (open: boolean, active: ISocialType | null) => void;
  doClearPosts: (cleared: boolean) => void;
  doEditPostDialog: (open: boolean) => void;
}

export type EventIgFormData = {
  mediaId?: string;
  image: any;
  start: Date;
  description: string;
  location: string[];
  comment: string;
  mediaType?: GetMediaType;
  mediaFrame?: string;
  mediaFrameSec?: number;
  edited?: boolean;
};

export type EventFbFormData = {
  mediaId?: string;
  image: any;
  start: Date;
  description: string;
  location: string[];
  mediaType?: GetMediaType;
  mediaFrame?: string;
  mediaFrameSec?: number;
  edited?: boolean;
};

export type EventTwFormData = {
  mediaId?: string;
  image: any;
  start: Date;
  description: string;
  location: string[];
  comment: string;
  mediaType?: GetMediaType;
  mediaFrame?: string;
  mediaFrameSec?: number;
  edited?: boolean;
};

export type EventLiFormData = {
  mediaId?: string;
  image: any;
  title: string;
  start: Date;
  description: string;
  location: string[];
  originalUrl: string;
  mediaType?: GetMediaType;
  mediaFrame?: string;
  mediaFrameSec?: number;
  edited?: boolean;
};
