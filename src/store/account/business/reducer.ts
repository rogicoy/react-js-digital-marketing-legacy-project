/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import produce, { Draft } from 'immer';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import { BusinessState } from './models';

export const initState: BusinessState = {
  requests: [],
  response: [],
  errors: [],
  data1: ''
};

const businessReducer = produce((draft: Draft<BusinessState>, action: ActionType<typeof actions>): BusinessState => {
  switch (action.type) {
    case getType(actions.callBusinessApi.request):
      draft.requests.push(action.payload);
      return draft;
    case getType(actions.callBusinessApi.success):
      draft.response.push(action.payload);
      return draft;
    case getType(actions.callBusinessApi.failure):
      draft.errors.push(action.payload);
      return draft;
    case getType(actions.updateData1):
      draft.data1 = action.payload;
      return draft;
    default:
      return draft;
  }
}, initState);

export default businessReducer;
