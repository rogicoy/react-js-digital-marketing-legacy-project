/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { Selector } from 'reselect';
import { AppErrorState } from './models';

export const rootState: Selector<any, AppErrorState> = (state: any) => state.errors;

export default { rootState };
