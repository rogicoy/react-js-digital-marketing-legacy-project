/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { createAction } from 'typesafe-actions';
import { AppError } from './models';
import * as types from './types';

export const logSystemError = createAction(types.LOG_SYSTEM_ERROR, (err: AppError) => err)();
export const logLocalError = createAction(types.LOG_LOCAL_ERROR, (err: AppError) => err)();

export const makeLogSystemError = (err: AppError) => logSystemError(err);
export const makeLogLocalError = (err: AppError) => logLocalError(err);
