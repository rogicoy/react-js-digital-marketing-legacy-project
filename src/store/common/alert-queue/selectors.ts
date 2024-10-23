/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { createSelector, Selector } from 'reselect';
import { AlertQueueItem, AlertQueueState } from './models';

export const rootState: Selector<any, AlertQueueState> = (state: any) => state.alertQueue;

export const isOpenAlert = (state: any) => rootState(state).openAlert;

export const makeGetTopAlert = () =>
  createSelector(rootState, (state: AlertQueueState): AlertQueueItem | undefined => {
    if (state.alerts.length > 0) {
      return state.alerts[0];
    }
    return undefined;
  });
