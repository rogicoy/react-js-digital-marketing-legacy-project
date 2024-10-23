/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import produce, { Draft } from 'immer';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import { BillingState } from './models';

export const initState: BillingState = {
  requests: [],
  response: [],
  errors: [],
  data1: ''
};

const billingReducer = produce((draft: Draft<BillingState>, action: ActionType<typeof actions>): BillingState => {
  switch (action.type) {
    case getType(actions.callBillingApi.request):
      draft.requests.push(action.payload);
      return draft;
    case getType(actions.callBillingApi.success):
      draft.response.push(action.payload);
      return draft;
    case getType(actions.callBillingApi.failure):
      draft.errors.push(action.payload);
      return draft;
    case getType(actions.updateData1):
      draft.data1 = action.payload;
      return draft;
    default:
      return draft;
  }
}, initState);

export default billingReducer;
