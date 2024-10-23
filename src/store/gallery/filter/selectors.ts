/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { Selector } from 'reselect';
import { FilterState } from './models';
import { Tag } from '../main/models';

export const rootState: Selector<any, FilterState> = (state: any) => state.gallery.filter;

export const getSelectedTags: Selector<any, Tag[]> = (state: any) => rootState(state).selectedTags;

export default {
  rootState,
  getSelectedTags
};
