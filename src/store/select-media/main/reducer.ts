/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import produce, { Draft } from 'immer';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import { SelectMediaFile, SelectMediaState } from './models';

export const initState: SelectMediaState = {
  medias: [],
  tags: [],
  currentPage: 0,
  pages: 0,
  perPage: 0,
  totalCount: 0,
  selectMediasApiLoading: true,
  selectedMediaFile: undefined,
  selectedMediaFiles: []
};

const mainReducer = produce((draft: Draft<SelectMediaState>, action: ActionType<typeof actions>): SelectMediaState => {
  switch (action.type) {
    case getType(actions.callSelectMediasApi.request):
      draft.selectMediasApiLoading = true;
      return draft;
    case getType(actions.callSelectMediasApi.success):
      draft.medias = action.payload.medias;
      draft.totalCount = action.payload.totalCount;
      draft.currentPage = action.payload.currentPage;
      draft.perPage = action.payload.perPage;
      draft.pages = action.payload.pages;
      draft.selectMediasApiLoading = false;
      return draft;
    case getType(actions.callSelectMediasApi.failure):
      draft.selectMediasApiLoading = false;
      return draft;
    case getType(actions.selectMediaFile):
      draft.selectedMediaFile = action.payload;
      return draft;
    case getType(actions.selectMediaFiles): {
      const isExisting = draft?.selectedMediaFiles?.findIndex((media: SelectMediaFile) => media.id === action.payload.id);
      if (isExisting !== -1) {
        draft.selectedMediaFiles = draft.selectedMediaFiles?.filter((media: SelectMediaFile) => media.id !== action.payload.id);
      } else {
        draft.selectedMediaFiles = [...draft.selectedMediaFiles, action.payload];
      }
      return draft;
    }
    default:
      return draft;
  }
}, initState);

export default mainReducer;
