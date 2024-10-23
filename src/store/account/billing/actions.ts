/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { createAction, createAsyncAction } from 'typesafe-actions';
import { AppError } from '../../common/error/models';
import * as models from './models';
import * as types from './types';

export const callBillingApi = createAsyncAction(types.GET_BILLING_API_REQUEST, types.GET_BILLING_API_SUCCESS, types.GET_BILLING_API_FAILED)<
  models.BillingApiRequest,
  models.BillingApiResponse,
  AppError
>();

export const updateData1 = createAction(types.UPDATE_DATA1, (data: string) => data)();

export const makeCallBillingApi = (request: models.BillingApiRequest) => callBillingApi.request(request);

export const makeUpdateData = (data: string) => updateData1(data);
