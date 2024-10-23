/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { Selector } from 'reselect';
import { DashboardState } from './models';

export const rootState: Selector<any, DashboardState> = (state: any) => state.dashboard;

export default {
  rootState
};
