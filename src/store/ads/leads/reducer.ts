/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import produce, { Draft } from 'immer';
import { AdsLeadsState } from './models';

export const initState: AdsLeadsState = {
  requests: [],
  response: [],
  errors: []
};

const AdsLeadsReducer = produce((draft: Draft<AdsLeadsState>, action): AdsLeadsState => {
  switch (action.type) {
    default:
      return draft;
  }
}, initState);

export default AdsLeadsReducer;
