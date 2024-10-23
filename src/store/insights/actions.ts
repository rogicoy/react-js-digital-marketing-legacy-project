/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { createAction, createAsyncAction } from 'typesafe-actions';
import { AppError } from '../common/error/models';
import * as models from './models';
import * as types from './types';

export const callInsightsApi = createAsyncAction(
  types.GET_INSIGHTS_API_REQUEST,
  types.GET_INSIGHTS_API_SUCCESS,
  types.GET_INSIGHTS_API_FAILED
)<models.InsightsApiRequest, models.InsightsApiResponse, AppError>();

export const updateData1 = createAction(types.UPDATE_DATA1, (data: string) => data)();

export const makeCallInsightsApi = (request: models.InsightsApiRequest) => callInsightsApi.request(request);

export const makeUpdateData = (data: string) => updateData1(data);
