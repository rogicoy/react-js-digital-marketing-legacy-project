/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { createAction, createAsyncAction } from 'typesafe-actions';
import * as models from './models';
import * as types from './types';

export const callUnsplashApi = createAsyncAction(
  types.GET_UNSPLASH_API_REQUEST,
  types.GET_UNSPLASH_API_SUCCESS,
  types.GET_UNSPLASH_API_FAILED
)<models.UnsplashApiRequest, models.UnsplashApiResponse>();

export const callUploadUnsplashApi = createAsyncAction(
  types.UPLOAD_UNSPLASH_API_REQUEST,
  types.UPLOAD_UNSPLASH_API_SUCCESS,
  types.UPLOAD_UNSPLASH_API_FAILED
)<models.UnsplashUploadApiRequest, models.UnsplashUploadApiResponse, models.UnsplashUploadApiResponse>();

export const clearUnsplashImages = createAction(types.CLEAR_UNSPLASH_IMAGES)();

export const changeUnplashImageStatus = createAction(types.CHANGE_IMAGE_STATUS, (id: string, status: types.ImageStatus) => ({
  id,
  status
}))();

export const makeCallUnsplashApi = (request: models.UnsplashApiRequest) => callUnsplashApi.request(request);

export const makeCallUploadUnsplashApi = (request: models.UnsplashUploadApiRequest) => callUploadUnsplashApi.request(request);

export const makeClearUnsplashImages = () => clearUnsplashImages();

export const makeChangeUnsplashImageStatus = (id: string, status: types.ImageStatus) => changeUnplashImageStatus(id, status);
