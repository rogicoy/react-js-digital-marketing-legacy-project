/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { Selector, createSelector } from 'reselect';
import { SelectMediaState } from './models';

export const rootState: Selector<any, SelectMediaState> = (state: any) => state.selectMedia.main;

export const makeFilterSelectedMedias = () =>
  createSelector(rootState, (state: SelectMediaState) => state.medias.filter((media) => media.selected === true));
