/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { createAction, createAsyncAction } from 'typesafe-actions';
import * as models from './models';
import * as types from './types';

export const addFiles = createAction(types.ADD_FILES, (files: models.DropzoneFile[]) => files)();

export const clearFiles = createAction(types.CLEAR_FILES)();

export const callFileUploadApi = createAsyncAction(types.UPLOAD_FILE_REQUEST, types.UPLOAD_FILE_SUCCESS, types.UPLOAD_FILE_FAILED)<
  models.FileUploadRequest,
  models.FileUploadResponse,
  models.FileUploadResponse
>();

export const makeAddFiles = (files: models.DropzoneFile[]) => addFiles(files);

export const makeClearFiles = () => clearFiles();

export const makeCallFileUploadApi = (file: models.FileUploadRequest) => callFileUploadApi.request(file);
