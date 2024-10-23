/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { Selector } from 'reselect';
import { UnsplashState } from './models';

export const rootState: Selector<any, UnsplashState> = (state: any) => state.gallery.unsplash;

export default {
  rootState
};
