/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { createAction, createAsyncAction } from 'typesafe-actions';
import { AppError } from '../../common/error/models';
import * as models from './models';
import * as types from './types';

export const callGalleryMediasApi = createAsyncAction(
  types.GET_GALLERY_MEDIAS_API_REQUEST,
  types.GET_GALLERY_MEDIAS_API_SUCCESS,
  types.GET_GALLERY_MEDIAS_API_FAILED
)<models.GalleryMediasApiRequest, models.GalleryMediasApiResponse, AppError>();

export const callGalleryDeleteMediasApi = createAsyncAction(
  types.DELETE_GALLERY_MEDIAS_API_REQUEST,
  types.DELETE_GALLERY_MEDIAS_API_SUCCESS,
  types.DELETE_GALLERY_MEDIAS_API_FAILED
)<string[], string[], string[]>();

export const callAccountTagsApi = createAsyncAction(
  types.GET_ACCOUNT_TAGS_API_REQUEST,
  types.GET_ACCOUNT_TAGS_API_SUCCESS,
  types.GET_ACCOUNT_TAGS_API_FAILED
)<undefined, models.Tag[]>();

export const callAddAccountTagApi = createAsyncAction(
  types.ADD_ACCOUNT_TAG_API_REQUEST,
  types.ADD_ACCOUNT_TAG_API_SUCCESS,
  types.ADD_ACCOUNT_TAG_API_FAILED
)<models.AddAccountTagApiRequest, models.AddAccountTagApiRequest, models.AddAccountTagApiRequest>();

export const callDeleteAccountTagApi = createAsyncAction(
  types.DELETE_ACCOUNT_TAG_API_REQUEST,
  types.DELETE_ACCOUNT_TAG_API_SUCCESS,
  types.DELETE_ACCOUNT_TAG_API_FAILED
)<models.DeleteAccountTagApiRequest, models.DeleteAccountTagApiRequest, models.DeleteAccountTagApiRequest>();

export const callAddMediaTagApi = createAsyncAction(
  types.ADD_MEDIA_TAG_API_REQUEST,
  types.ADD_MEDIA_TAG_API_SUCCESS,
  types.ADD_MEDIA_TAG_API_FAILED
)<models.MediaTagApiRequest, models.MediaTagApiRequest, models.MediaTagApiRequest>();

export const callDeleteMediaTagApi = createAsyncAction(
  types.DELETE_MEDIA_TAG_API_REQUEST,
  types.DELETE_MEDIA_TAG_API_SUCCESS,
  types.DELETE_MEDIA_TAG_API_FAILED
)<models.MediaTagApiRequest, models.MediaTagApiRequest, models.MediaTagApiRequest>();

export const clearDeleteMediasReqStatus = createAction(types.CLEAR_DELETE_MEDIAS_REQ_STATUS)();

export const clearAddAccountTagReqStatus = createAction(types.CLEAR_ADD_ACCOUNT_TAG_REQ_STATUS)();

export const clearDeleteAccountTagReqStatus = createAction(types.CLEAR_DELETE_ACCOUNT_TAG_REQ_STATUS)();

export const clearAddMediaTagReqStatus = createAction(
  types.CLEAR_ADD_MEDIA_TAG_REQ_STATUS,
  (request: models.MediaTagApiRequest) => request
)();

export const clearDeleteMediaTagReqStatus = createAction(
  types.CLEAR_DELETE_MEDIA_TAG_REQ_STATUS,
  (request: models.MediaTagApiRequest) => request
)();

export const refreshMediaTags = createAction(types.REFRESH_MEDIA_TAGS, (params: models.RefreshMediaTagsParams) => params)();

export const switchGalleryView = createAction(types.SWITCH_GALLERY_VIEW, (view: types.GalleryView) => view)();

export const selectGalleryMedia = createAction(types.SELECT_GALLERY_MEDIA, (index: number) => index)();

export const selectAllGalleryMedia = createAction(types.SELECT_ALL_GALLERY_MEDIA)();

export const unselectAllGalleryMedia = createAction(types.UNSELECT_ALL_GALLERY_MEDIA)();

export const openUploadDropzone = createAction(types.OPEN_UPLOAD_DROPZONE, (open: boolean) => open)();

export const openUnsplashDialog = createAction(types.OPEN_UNSPLASH_DIALOG, (open: boolean) => open)();

export const openManageTagsDialog = createAction(types.OPEN_MANAGE_TAGS_DIALOG, (open: boolean) => open)();

export const openMediaDetailsDialog = createAction(types.OPEN_MEDIA_DETAILS_DIALOG, (index: number) => index)();

export const makeCallGalleryMediasApi = (request: models.GalleryMediasApiRequest) => callGalleryMediasApi.request(request);

export const makeCallGalleryDeleteMediasApi = (mediaIds: string[]) => callGalleryDeleteMediasApi.request(mediaIds);

export const makeCallAccountTagsApi = () => callAccountTagsApi.request();

export const makeCallAddAccountTagApi = (request: models.AddAccountTagApiRequest) => callAddAccountTagApi.request(request);

export const makeCallDeleteAccountTagApi = (request: models.DeleteAccountTagApiRequest) => callDeleteAccountTagApi.request(request);

export const makeCallAddMediaTagApi = (request: models.MediaTagApiRequest) => callAddMediaTagApi.request(request);

export const makeCallDeleteMediaTagApi = (request: models.MediaTagApiRequest) => callDeleteMediaTagApi.request(request);

export const makeClearDeleteMediasReqStatus = () => clearDeleteMediasReqStatus();

export const makeClearAddAccountTagReqStatus = () => clearAddAccountTagReqStatus();

export const makeClearDeleteAccountTagReqStatus = () => clearDeleteAccountTagReqStatus();

export const makeClearAddMediaTagReqStatus = (request: models.MediaTagApiRequest) => clearAddMediaTagReqStatus(request);

export const makeClearDeleteMediaTagReqStatus = (request: models.MediaTagApiRequest) => clearDeleteMediaTagReqStatus(request);

export const makeRefreshMediaTags = (params: models.RefreshMediaTagsParams) => refreshMediaTags(params);

export const makeSwitchGalleryView = (view: types.GalleryView) => switchGalleryView(view);

export const makeSelectGalleryMedia = (index: number) => selectGalleryMedia(index);

export const makeSelectAllGalleryMedia = () => selectAllGalleryMedia();

export const makeUnselectAllGalleryMedia = () => unselectAllGalleryMedia();

export const makeOpenUploadDropzone = (open: boolean) => openUploadDropzone(open);

export const makeOpenUnsplashDialog = (open: boolean) => openUnsplashDialog(open);

export const makeOpenManageTagsDialog = (open: boolean) => openManageTagsDialog(open);

export const makeOpenMediaDetailsDialog = (index: number) => openMediaDetailsDialog(index);
