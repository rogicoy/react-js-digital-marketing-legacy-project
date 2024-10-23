/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import produce, { Draft } from 'immer';
import { ActionType, getType } from 'typesafe-actions';
import { AppErrorState } from './models';
import * as actions from './actions';

export const initState: AppErrorState = {
  systemErrors: [],
  localErrors: []
};

const appErrorReducer = produce((draft: Draft<AppErrorState>, action: ActionType<typeof actions>): AppErrorState => {
  switch (action.type) {
    case getType(actions.logSystemError):
      draft.systemErrors.push({ ...action.payload, resolved: false });
      return draft;
    case getType(actions.logLocalError):
      draft.localErrors.push({ ...action.payload, resolved: false });
      return draft;
    default:
      return draft;
  }
}, initState);

export default appErrorReducer;
