/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { ISocialType } from 'types';
import { createAction, createAsyncAction } from 'typesafe-actions';
import { AppError } from '../common/error/models';
import * as models from './models';
import * as types from './types';

export const getSchedulerPosts = createAsyncAction(
  types.GET_SCHEDULER_POSTS_REQUEST,
  types.GET_SCHEDULER_POSTS_SUCCESS,
  types.GET_SCHEDULER_POSTS_FAILED
)<models.GetSchedulerPostsRequest, models.GetSchedulerPostsResponse, AppError>();

export const getIgPosts = createAsyncAction(types.GET_IG_POSTS_REQUEST, types.GET_SCHED_POSTS_SUCCESS, types.GET_IG_POSTS_FAILED)<
  models.GetIgPoststRequest,
  models.GetSchedPostsResponse[],
  AppError
>();

export const getFbPosts = createAsyncAction(types.GET_FB_POSTS_REQUEST, types.GET_SCHED_POSTS_SUCCESS, types.GET_FB_POSTS_FAILED)<
  models.GetFbPoststRequest,
  models.GetSchedPostsResponse[],
  AppError
>();

export const getTwPosts = createAsyncAction(types.GET_TW_POSTS_REQUEST, types.GET_SCHED_POSTS_SUCCESS, types.GET_TW_POSTS_FAILED)<
  models.GetTwPoststRequest,
  models.GetSchedPostsResponse[],
  AppError
>();

export const getLiPosts = createAsyncAction(types.GET_TW_POSTS_REQUEST, types.GET_SCHED_POSTS_SUCCESS, types.GET_LI_POSTS_FAILED)<
  models.GetLiPoststRequest,
  models.GetSchedPostsResponse[],
  AppError
>();

export const createSchedulerPost = createAsyncAction(
  types.CREATE_SCHEDULER_POST_REQUEST,
  types.CREATE_SCHEDULER_POST_SUCCESS,
  types.CREATE_SCHEDULER_POST_FAILED
)<models.CreateSchedulerPostRequest, models.CreateSchedulerPostResponse, AppError>();

export const createSchedulerIgPost = createAsyncAction(
  types.CREATE_SCHEDULER_POST_REQUEST,
  types.CREATE_SCHEDULER_POST_SUCCESS,
  types.CREATE_SCHEDULER_POST_FAILED
)<models.CreateSchedulerIgPostRequest, models.CreateSchedulerPostResponse, AppError>();

export const createSchedulerFbPost = createAsyncAction(
  types.CREATE_SCHEDULER_POST_REQUEST,
  types.CREATE_SCHEDULER_POST_SUCCESS,
  types.CREATE_SCHEDULER_POST_FAILED
)<models.CreateSchedulerFbPostRequest, models.CreateSchedulerPostResponse, AppError>();

export const openPostDialog = createAction(types.OPEN_POST_DIALOG, (open: boolean) => open)();

export const openSuccessDialog = createAction(types.OPEN_SUCCESS_DIALOG, (open: boolean, active: ISocialType | null) => ({
  open,
  active
}))();

export const openEditor = createAction(types.OPEN_EDITOR, (open: boolean) => open)();

export const clearPosts = createAction(types.CLEAR_POSTS, (cleared: boolean) => cleared)();

export const editPostDialog = createAction(types.EDIT_POST_DIALOG, (open: boolean) => open)();

export const makeGetSchedulerPosts = (request: models.GetSchedulerPostsRequest) => getSchedulerPosts.request(request);

export const makeGetIgPosts = (request: models.GetIgPoststRequest) => getIgPosts.request(request);

export const makeGetFbPosts = (request: models.GetFbPoststRequest) => getFbPosts.request(request);

export const makeGetTwPosts = (request: models.GetTwPoststRequest) => getTwPosts.request(request);

export const makeGetLiPosts = (request: models.GetLiPoststRequest) => getLiPosts.request(request);

export const makeCreateSchedulerPost = (request: models.CreateSchedulerPostRequest) => createSchedulerPost.request(request);

export const makeCreateSchedulerIgPost = (request: models.CreateSchedulerIgPostRequest) => createSchedulerIgPost.request(request);

export const makeCreateSchedulerFbPost = (request: models.CreateSchedulerFbPostRequest) => createSchedulerFbPost.request(request);

export const makeOpenPostDialog = (open: boolean) => openPostDialog(open);

export const makeOpenSuccessDialog = (open: boolean, active: ISocialType | null) => openSuccessDialog(open, active);

export const makeOpenEditor = (open: boolean) => openEditor(open);

export const makeClearPosts = (cleared: boolean) => clearPosts(cleared);

export const makeEditPostDialog = (open: boolean) => editPostDialog(open);
