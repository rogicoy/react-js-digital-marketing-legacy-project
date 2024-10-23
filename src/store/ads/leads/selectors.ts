/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { Selector } from 'reselect';
import { AdsLeadsState } from './models';

export const rootState: Selector<any, AdsLeadsState> = (state: any) => state.ads.leads;

export default {
  rootState
};
