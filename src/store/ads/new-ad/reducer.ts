/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import produce, { Draft } from 'immer';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import { NewAdState, Status } from './models';

export const initState: NewAdState = {
  requests: [],
  response: [],
  errors: [],
  data1: '',
  facebookCampaign: {
    id: '',
    objective: '',
    name: '',
    categories: '',
    budget: '',
    budgetType: 'DAILY',
    startDate: '',
    endDate: '',
    status: 'PENDING'
  }
};

const newAdReducer = produce((draft: Draft<NewAdState>, action: ActionType<typeof actions>): NewAdState => {
  switch (action.type) {
    case getType(actions.callNewAdApi.request):
      draft.requests.push(action.payload);
      return draft;
    case getType(actions.callNewAdApi.success):
      draft.response.push(action.payload);
      return draft;
    case getType(actions.callNewAdApi.failure):
      draft.errors.push(action.payload);
      return draft;
    case getType(actions.updateData1):
      draft.data1 = action.payload;
      return draft;
    case getType(actions.callFacebookCampaignApi.success):
      draft.facebookCampaign = {
        id: action.payload.info,
        status: 'PENDING'
      };

      return draft;
    default:
      return draft;
  }
}, initState);

export default newAdReducer;
