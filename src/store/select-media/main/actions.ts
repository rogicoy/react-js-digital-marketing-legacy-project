/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { createAction, createAsyncAction } from 'typesafe-actions';
import { AppError } from '../../common/error/models';
import * as models from './models';
import * as types from './types';

export const callSelectMediasApi = createAsyncAction(
  types.GET_SELECT_MEDIAS_API_REQUEST,
  types.GET_SELECT_MEDIAS_API_SUCCESS,
  types.GET_SELECT_MEDIAS_API_FAILED
)<models.SelectMediasApiRequest, models.SelectMediasApiResponse, AppError>();

export const selectMediaFile = createAction(types.SELECT_MEDIA_FILE, (file: models.SelectMediaFile) => file)();

export const selectMediaFiles = createAction(types.SELECT_MEDIA_FILES, (file: models.SelectMediaFile) => file)();

export const makeCallSelectMediasApi = (request: models.SelectMediasApiRequest) => callSelectMediasApi.request(request);

export const makeSelectMediaFile = (file: models.SelectMediaFile) => selectMediaFile(file);

export const makeSelectMediaFiles = (file: models.SelectMediaFile) => selectMediaFiles(file);
