/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { Selector } from 'reselect';
import { AdsReportsState } from './models';

export const rootState: Selector<any, AdsReportsState> = (state: any) => state.ads.reports;

export default {
  rootState
};
