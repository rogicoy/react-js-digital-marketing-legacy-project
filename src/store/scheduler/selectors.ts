/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { createSelector, Selector } from 'reselect';
import { SchedulerState } from './models';

export const rootState: Selector<any, SchedulerState> = (state: any) => state.scheduler;

export const makeFormattedRequests = () =>
  createSelector(rootState, (state: SchedulerState) => {
    const result: string[] = [];
    state.requests.map((request) => result.push(`${request.startDateString} and ${request.endDateString}`));
    return result;
  });

export default {
  rootState,
  makeFormattedRequests
};
