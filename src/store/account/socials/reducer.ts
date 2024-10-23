/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import produce, { Draft } from 'immer';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import { SocialsState } from './models';

export const initState: SocialsState = {
  requests: [],
  response: [],
  errors: [],
  data1: ''
};

const socialsReducer = produce((draft: Draft<SocialsState>, action: ActionType<typeof actions>): SocialsState => {
  switch (action.type) {
    case getType(actions.callSocialsApi.request):
      draft.requests.push(action.payload);
      return draft;
    case getType(actions.callSocialsApi.success):
      draft.response.push(action.payload);
      return draft;
    case getType(actions.callSocialsApi.failure):
      draft.errors.push(action.payload);
      return draft;
    case getType(actions.updateData1):
      draft.data1 = action.payload;
      return draft;
    default:
      return draft;
  }
}, initState);

export default socialsReducer;
