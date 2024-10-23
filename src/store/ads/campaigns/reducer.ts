/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import produce, { Draft } from 'immer';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import { AdsCampaignsState } from './models';

export const initState: AdsCampaignsState = {
  requests: [],
  response: [],
  errors: [],
  data1: ''
};

const adsCampaignsReducer = produce((draft: Draft<AdsCampaignsState>, action: ActionType<typeof actions>): AdsCampaignsState => {
  switch (action.type) {
    case getType(actions.callAdsCampaignsApi.request):
      draft.requests.push(action.payload);
      return draft;
    case getType(actions.callAdsCampaignsApi.success):
      draft.response.push(action.payload);
      return draft;
    case getType(actions.callAdsCampaignsApi.failure):
      draft.errors.push(action.payload);
      return draft;
    case getType(actions.updateData1):
      draft.data1 = action.payload;
      return draft;
    default:
      return draft;
  }
}, initState);

export default adsCampaignsReducer;
