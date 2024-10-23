/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import produce, { Draft } from 'immer';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import { UnsplashState } from './models';
import { ImageStatus } from './types';

export const initState: UnsplashState = {
  images: [],
  filter: {
    query: '',
    page: 0,
    perPage: 0
  }
};

const changeImageStatus = (draft: Draft<UnsplashState>, id: string, status: ImageStatus) => {
  const index = draft.images.findIndex((image) => image.id === id);
  if (index > -1) {
    draft.images[index].status = status;
  }
  return draft;
};

const unsplashReducer = produce((draft: Draft<UnsplashState>, action: ActionType<typeof actions>): UnsplashState => {
  switch (action.type) {
    case getType(actions.callUnsplashApi.request):
      draft.filter = action.payload.filter;
      return draft;
    case getType(actions.callUnsplashApi.success):
      draft.images = [...draft.images, ...action.payload.images];
      return draft;
    case getType(actions.callUploadUnsplashApi.request):
      return changeImageStatus(draft, action.payload.link, 'uploading');
    case getType(actions.callUploadUnsplashApi.success):
      return changeImageStatus(draft, action.payload.link, 'added');
    case getType(actions.callUploadUnsplashApi.failure):
      return changeImageStatus(draft, action.payload.link, 'unused');
    case getType(actions.changeUnplashImageStatus):
      return changeImageStatus(draft, action.payload.id, action.payload.status);
    case getType(actions.clearUnsplashImages):
      return initState;
    default:
      return draft;
  }
}, initState);

export default unsplashReducer;
