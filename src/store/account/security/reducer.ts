/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import produce, { Draft } from 'immer';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import { SecurityState } from './models';

export const initState: SecurityState = {
  requests: [],
  response: [],
  errors: [],
  data1: ''
};

const securityReducer = produce((draft: Draft<SecurityState>, action: ActionType<typeof actions>): SecurityState => {
  switch (action.type) {
    case getType(actions.callSecurityApi.request):
      draft.requests.push(action.payload);
      return draft;
    case getType(actions.callSecurityApi.success):
      draft.response.push(action.payload);
      return draft;
    case getType(actions.callSecurityApi.failure):
      draft.errors.push(action.payload);
      return draft;
    case getType(actions.updateData1):
      draft.data1 = action.payload;
      return draft;
    default:
      return draft;
  }
}, initState);

export default securityReducer;
