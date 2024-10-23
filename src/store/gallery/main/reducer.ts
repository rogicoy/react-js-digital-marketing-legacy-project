/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import produce, { Draft } from 'immer';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import {
  AddAccountTagApiRequest,
  DeleteAccountTagApiRequest,
  GalleryState,
  MediaTagApiRequest,
  MediaTagRequestStatus,
  RefreshMediaTagsParams
} from './models';
import { RequestStatus } from './types';

export const initState: GalleryState = {
  medias: [],
  tags: [],
  currentPage: 0,
  pages: 0,
  perPage: 0,
  totalCount: 0,
  view: 'grid',
  openUploadDropzone: false,
  openUnsplashDialog: false,
  openManageTagsDialog: false,
  openMediaDetailsDialog: -1,
  galleryMediasApiLoading: true,
  addMediaTagRequestStatusLogs: [],
  deleteMediaTagRequestStatusLogs: []
};

const redraftOnDeleteMedias = (draft: Draft<GalleryState>, ids?: string[], status?: RequestStatus) => {
  draft.deleteMediaRequestStatus = ids ? { ids, status } : undefined;
  return draft;
};

const redraftOnAddAccountTag = (draft: Draft<GalleryState>, payload?: AddAccountTagApiRequest, status?: RequestStatus) => {
  draft.addAccountTagRequestStatus = payload ? { ...payload, status } : undefined;
  return draft;
};

const redraftOnDeleteAccountTag = (draft: Draft<GalleryState>, payload?: DeleteAccountTagApiRequest, status?: RequestStatus) => {
  draft.deleteAccountTagRequestStatus = payload ? { ...payload, status } : undefined;
  return draft;
};

const redraftManageMediaTag = (logs: MediaTagRequestStatus[], payload: MediaTagApiRequest, status?: RequestStatus) => {
  const { mediaId, tag } = payload;
  const index = logs.findIndex((log) => log.mediaId === mediaId && log.tag === tag);

  if (status) {
    if (index > -1) {
      logs[index].status = status;
    } else {
      logs.push({ mediaId, tag, status });
    }
  } else {
    logs.splice(index, 1);
  }
};

const redraftRefreshMediaTag = (draft: Draft<GalleryState>, payload: RefreshMediaTagsParams) => {
  const index = draft.medias.findIndex((media) => media.id === payload.mediaId);
  if (index > -1) {
    draft.medias[index].tags = payload.nextTags;
  }

  return draft;
};

const mainReducer = produce((draft: Draft<GalleryState>, action: ActionType<typeof actions>): GalleryState => {
  switch (action.type) {
    case getType(actions.callGalleryMediasApi.request):
      draft.galleryMediasApiLoading = true;
      return draft;
    case getType(actions.callGalleryMediasApi.success):
      draft.medias = action.payload.medias;
      draft.totalCount = action.payload.totalCount;
      draft.currentPage = action.payload.currentPage;
      draft.perPage = action.payload.perPage;
      draft.pages = action.payload.pages;
      draft.galleryMediasApiLoading = false;
      return draft;
    case getType(actions.callGalleryMediasApi.failure):
      draft.galleryMediasApiLoading = false;
      return draft;
    case getType(actions.callGalleryDeleteMediasApi.request):
      return redraftOnDeleteMedias(draft, action.payload, 'ongoing');
    case getType(actions.callGalleryDeleteMediasApi.success):
      return redraftOnDeleteMedias(draft, action.payload, 'success');
    case getType(actions.callGalleryDeleteMediasApi.failure):
      return redraftOnDeleteMedias(draft, action.payload, 'failed');
    case getType(actions.clearDeleteMediasReqStatus):
      return redraftOnDeleteMedias(draft);
    case getType(actions.callAccountTagsApi.success):
      draft.tags = action.payload;
      return draft;
    case getType(actions.callAddAccountTagApi.request):
      return redraftOnAddAccountTag(draft, action.payload, 'ongoing');
    case getType(actions.callAddAccountTagApi.success):
      return redraftOnAddAccountTag(draft, action.payload, 'success');
    case getType(actions.callAddAccountTagApi.failure):
      return redraftOnAddAccountTag(draft, action.payload, 'failed');
    case getType(actions.clearAddAccountTagReqStatus):
      return redraftOnAddAccountTag(draft);
    case getType(actions.callDeleteAccountTagApi.request):
      return redraftOnDeleteAccountTag(draft, action.payload, 'ongoing');
    case getType(actions.callDeleteAccountTagApi.success):
      return redraftOnDeleteAccountTag(draft, action.payload, 'success');
    case getType(actions.callDeleteAccountTagApi.failure):
      return redraftOnDeleteAccountTag(draft, action.payload, 'failed');
    case getType(actions.clearDeleteAccountTagReqStatus):
      return redraftOnDeleteAccountTag(draft);
    case getType(actions.callAddMediaTagApi.request):
      redraftManageMediaTag(draft.addMediaTagRequestStatusLogs, action.payload, 'ongoing');
      return draft;
    case getType(actions.callAddMediaTagApi.success):
      redraftManageMediaTag(draft.addMediaTagRequestStatusLogs, action.payload, 'success');
      return draft;
    case getType(actions.callAddMediaTagApi.failure):
      redraftManageMediaTag(draft.addMediaTagRequestStatusLogs, action.payload, 'failed');
      return draft;
    case getType(actions.clearAddMediaTagReqStatus):
      redraftManageMediaTag(draft.addMediaTagRequestStatusLogs, action.payload);
      return draft;
    case getType(actions.callDeleteMediaTagApi.request):
      redraftManageMediaTag(draft.deleteMediaTagRequestStatusLogs, action.payload, 'ongoing');
      return draft;
    case getType(actions.callDeleteMediaTagApi.success):
      redraftManageMediaTag(draft.deleteMediaTagRequestStatusLogs, action.payload, 'success');
      return draft;
    case getType(actions.callDeleteMediaTagApi.failure):
      redraftManageMediaTag(draft.deleteMediaTagRequestStatusLogs, action.payload, 'failed');
      return draft;
    case getType(actions.clearDeleteMediaTagReqStatus):
      redraftManageMediaTag(draft.deleteMediaTagRequestStatusLogs, action.payload);
      return draft;
    case getType(actions.refreshMediaTags):
      return redraftRefreshMediaTag(draft, action.payload);
    case getType(actions.switchGalleryView):
      draft.view = action.payload;
      return draft;
    case getType(actions.selectGalleryMedia):
      draft.medias[action.payload].selected = !draft.medias[action.payload].selected;
      return draft;
    case getType(actions.selectAllGalleryMedia):
      draft.medias.forEach((media) => {
        media.selected = true;
      });
      return draft;
    case getType(actions.unselectAllGalleryMedia):
      draft.medias.forEach((media) => {
        media.selected = false;
      });
      return draft;
    case getType(actions.openUploadDropzone):
      draft.openUploadDropzone = action.payload;
      return draft;
    case getType(actions.openUnsplashDialog):
      draft.openUnsplashDialog = action.payload;
      return draft;
    case getType(actions.openManageTagsDialog):
      draft.openManageTagsDialog = action.payload;
      return draft;
    case getType(actions.openMediaDetailsDialog):
      draft.openMediaDetailsDialog = action.payload;
      return draft;
    default:
      return draft;
  }
}, initState);

export default mainReducer;
