/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import produce, { Draft } from 'immer';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import { InsightsState } from './models';

export const initState: InsightsState = {
  requests: [],
  response: [],
  errors: [],
  data1: ''
};

const insightsReducer = produce((draft: Draft<InsightsState>, action: ActionType<typeof actions>): InsightsState => {
  switch (action.type) {
    case getType(actions.callInsightsApi.request):
      draft.requests.push(action.payload);
      return draft;
    case getType(actions.callInsightsApi.success):
      draft.response.push(action.payload);
      return draft;
    case getType(actions.callInsightsApi.failure):
      draft.errors.push(action.payload);
      return draft;
    case getType(actions.updateData1):
      draft.data1 = action.payload;
      return draft;
    default:
      return draft;
  }
}, initState);

export default insightsReducer;
