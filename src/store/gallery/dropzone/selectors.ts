/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { Selector, createSelector } from 'reselect';
import { DropzoneState, DropzoneViolationCount } from './models';

const maxImageWidth = 3000;
const maxImageHeight = 3000;

export const rootState: Selector<any, DropzoneState> = (state: any) => state.gallery.dropzone;

export const makeCollateViolationCount = () =>
  createSelector(
    rootState,
    (state: DropzoneState): DropzoneViolationCount => {
      const filesWithInvalidDimension = state.files.filter((file) => file.width > maxImageWidth && file.height > maxImageHeight).length;
      const filesWithInvalidWidthOnly = state.files.filter((file) => file.width > maxImageWidth && file.height <= maxImageHeight).length;
      const filesWithInvalidHeightOnly = state.files.filter((file) => file.height > maxImageWidth && file.width <= maxImageWidth).length;

      return {
        filesWithInvalidDimension,
        filesWithInvalidWidthOnly,
        filesWithInvalidHeightOnly
      };
    }
  );

export const makeGetValidFiles = () =>
  createSelector(rootState, (state: DropzoneState) =>
    state.files.filter((file) => file.width <= maxImageWidth && file.height <= maxImageHeight)
  );

export const makeGetSuccessfulUploads = () =>
  createSelector(rootState, (state: DropzoneState) => state.files.filter((file) => file.uploadStatus === 'success'));

export const makeGetFailedUploads = () =>
  createSelector(rootState, (state: DropzoneState) => state.files.filter((file) => file.uploadStatus === 'failed'));

export const makeGetOngoingUploads = () =>
  createSelector(rootState, (state: DropzoneState) => state.files.filter((file) => file.uploadStatus === 'ongoing'));
