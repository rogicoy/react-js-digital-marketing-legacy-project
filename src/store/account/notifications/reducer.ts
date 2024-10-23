/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import produce, { Draft } from 'immer';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import { NotificationsState } from './models';

export const initState: NotificationsState = {
  requests: [],
  response: [],
  errors: [],
  data1: ''
};

const notificationsReducer = produce((draft: Draft<NotificationsState>, action: ActionType<typeof actions>): NotificationsState => {
  switch (action.type) {
    case getType(actions.callNotificationsApi.request):
      draft.requests.push(action.payload);
      return draft;
    case getType(actions.callNotificationsApi.success):
      draft.response.push(action.payload);
      return draft;
    case getType(actions.callNotificationsApi.failure):
      draft.errors.push(action.payload);
      return draft;
    case getType(actions.updateData1):
      draft.data1 = action.payload;
      return draft;
    default:
      return draft;
  }
}, initState);

export default notificationsReducer;
