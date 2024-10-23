/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { createSelector, Selector } from 'reselect';
import { NewAdState } from './models';

export const rootState: Selector<any, NewAdState> = (state: any) => state.ads.newAd;

export const makeFormattedRequests = () =>
  createSelector(rootState, (state: NewAdState) => {
    const result: string[] = [];
    state.requests.map((request) => result.push(`${request.data1} and ${request.data2}`));
    return result;
  });

export default {
  rootState,
  makeFormattedRequests
};
