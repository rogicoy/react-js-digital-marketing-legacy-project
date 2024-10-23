/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import produce, { Draft } from 'immer';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import { FilterState } from './models';

export const initState: FilterState = {
  selectedTags: []
};

const filterReducer = produce((draft: Draft<FilterState>, action: ActionType<typeof actions>): FilterState => {
  switch (action.type) {
    case getType(actions.updateSelectedTags):
      draft.selectedTags = action.payload;
      return draft;
    default:
      return draft;
  }
}, initState);

export default filterReducer;
