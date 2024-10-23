/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import produce, { Draft } from 'immer';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import { AdsReportsState } from './models';

export const initState: AdsReportsState = {
  campaignReports: [],
  isLoading: false
};

const adsReportsReducer = produce((draft: Draft<AdsReportsState>, action: ActionType<typeof actions>): AdsReportsState => {
  switch (action.type) {
    case getType(actions.callAdsReportsApi.request):
      draft.isLoading = true;
      return draft;
    case getType(actions.callAdsReportsApi.success):
      draft.campaignReports = action.payload;
      draft.isLoading = false;
      return draft;
    case getType(actions.callAdsReportsApi.failure):
      draft.isLoading = false;
      return draft;
    default:
      return draft;
  }
}, initState);

export default adsReportsReducer;
