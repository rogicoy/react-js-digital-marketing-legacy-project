/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import produce, { Draft } from 'immer';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import { ProfileState } from './models';

export const initState: ProfileState = {
  me: null
};

const profileReducer = produce((draft: Draft<ProfileState>, action: ActionType<typeof actions>): ProfileState => {
  switch (action.type) {
    case getType(actions.updateProfile):
      draft.me = action.payload;
      return draft;
    default:
      return draft;
  }
}, initState);

export default profileReducer;
