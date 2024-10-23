/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import produce, { Draft } from 'immer';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import { DashboardState } from './models';

export const initState: DashboardState = {
  response: ''
};

const dashboardReducer = produce((draft: Draft<DashboardState>, action: ActionType<typeof actions>): DashboardState => {
  switch (action.type) {
    case getType(actions.callDashboardApi.success):
      draft.response = action.payload.response;
      return draft;
    case getType(actions.callDashboardApi.failure):
      draft.response = action.payload.response;
      return draft;
    default:
      return draft;
  }
}, initState);

export default dashboardReducer;
