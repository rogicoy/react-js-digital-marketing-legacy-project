/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { createSelector, Selector } from 'reselect';
import { AdsCampaignsState } from './models';

export const rootState: Selector<any, AdsCampaignsState> = (state: any) => state.ads.campaigns;

export const makeFormattedRequests = () =>
  createSelector(rootState, (state: AdsCampaignsState) => {
    const result: string[] = [];
    state.requests.map((request) => result.push(`${request.data1} and ${request.data2}`));
    return result;
  });

export default {
  rootState,
  makeFormattedRequests
};
