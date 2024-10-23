/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { createAction } from 'typesafe-actions';
import { SectionPrefix } from '../types';
import * as types from './types';

export const enqueueSuccessAlert = createAction(types.ENQUEUE_SUCCESS_ALERT, (section: SectionPrefix, message: string) => ({
  section,
  message
}))();

export const enqueueErrorAlert = createAction(types.ENQUEUE_ERROR_ALERT, (section: SectionPrefix, message: string) => ({
  section,
  message
}))();

export const enqueueWarningAlert = createAction(types.ENQUEUE_WARNING_ALERT, (section: SectionPrefix, message: string) => ({
  section,
  message
}))();

export const enqueueInfoAlert = createAction(types.ENQUEUE_INFO_ALERT, (section: SectionPrefix, message: string) => ({
  section,
  message
}))();

export const dequeueAlert = createAction(types.DEQUEUE_ALERT)();

export const openAlert = createAction(types.OPEN_ALERT, (open: boolean) => open)();

export const makeEnqueueSuccessAlert = (section: SectionPrefix, message: string) => enqueueSuccessAlert(section, message);

export const makeEnqueueErrorAlert = (section: SectionPrefix, message: string) => enqueueErrorAlert(section, message);

export const makeEnqueueWarningAlert = (section: SectionPrefix, message: string) => enqueueWarningAlert(section, message);

export const makeEnqueueInfoAlert = (section: SectionPrefix, message: string) => enqueueInfoAlert(section, message);

export const makeDequeueAlert = () => dequeueAlert();

export const makeOpenAlert = (open: boolean) => openAlert(open);
