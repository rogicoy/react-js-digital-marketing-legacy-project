/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import produce, { Draft } from 'immer';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import { DropzoneState } from './models';
import { UploadStatus } from './types';

export const initState: DropzoneState = {
  files: []
};

const handleFileUploadResponse = (draft: Draft<DropzoneState>, ref: string, status: UploadStatus) => {
  const index = draft.files.findIndex((file) => file.ref === ref);
  if (index > -1) {
    draft.files[index].uploadStatus = status;
  }
  return draft;
};

const dropzoneReducer = produce((draft: Draft<DropzoneState>, action: ActionType<typeof actions>): DropzoneState => {
  switch (action.type) {
    case getType(actions.addFiles):
      draft.files = [...draft.files, ...action.payload];
      return draft;
    case getType(actions.clearFiles):
      draft.files = [];
      return draft;
    case getType(actions.callFileUploadApi.request):
      return handleFileUploadResponse(draft, action.payload.ref, 'ongoing');
    case getType(actions.callFileUploadApi.success):
      return handleFileUploadResponse(draft, action.payload.ref, 'success');
    case getType(actions.callFileUploadApi.failure):
      return handleFileUploadResponse(draft, action.payload.ref, 'failed');
    default:
      return draft;
  }
}, initState);

export default dropzoneReducer;
