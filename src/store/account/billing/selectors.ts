/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { createSelector, Selector } from 'reselect';
import { BillingState } from './models';

export const rootState: Selector<any, BillingState> = (state: any) => state.account.billing;

export const makeFormattedRequests = () =>
  createSelector(rootState, (state: BillingState) => {
    const result: string[] = [];
    state.requests.map((request) => result.push(`${request.data1} and ${request.data2}`));
    return result;
  });

export default {
  rootState,
  makeFormattedRequests
};
