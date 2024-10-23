/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import produce, { Draft } from 'immer';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import { AlertQueueState } from './models';

export const initState: AlertQueueState = {
  alerts: [],
  openAlert: false
};

const alertQueueReducer = produce((draft: Draft<AlertQueueState>, action: ActionType<typeof actions>): AlertQueueState => {
  switch (action.type) {
    case getType(actions.enqueueSuccessAlert):
      draft.alerts.push({
        ...action.payload,
        type: 'success'
      });
      return draft;
    case getType(actions.enqueueErrorAlert):
      draft.alerts.push({
        ...action.payload,
        type: 'error'
      });
      return draft;
    case getType(actions.enqueueWarningAlert):
      draft.alerts.push({
        ...action.payload,
        type: 'warning'
      });
      return draft;
    case getType(actions.enqueueInfoAlert):
      draft.alerts.push({
        ...action.payload,
        type: 'info'
      });
      return draft;
    case getType(actions.dequeueAlert):
      draft.alerts = draft.alerts.slice(1, draft.alerts.length);
      return draft;
    case getType(actions.openAlert):
      draft.openAlert = action.payload;
      return draft;
    default:
      return draft;
  }
}, initState);

export default alertQueueReducer;
