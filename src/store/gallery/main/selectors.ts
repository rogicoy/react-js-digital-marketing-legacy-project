/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { Selector, createSelector } from 'reselect';
import { FilterState } from '../filter/models';
import { GalleryState } from './models';

export const rootState: Selector<any, GalleryState> = (state: any) => state.gallery.main;

export const filterState: Selector<any, FilterState> = (state: any) => state.gallery.filter;

export const makeFilterSelectedMedias = () =>
  createSelector(rootState, (state: GalleryState) => state.medias.filter((media) => media.selected === true));

export const makeFilterUnsplashImages = () =>
  createSelector(rootState, (state: GalleryState) => state.medias.filter((media) => media.source === 'unsplash'));
