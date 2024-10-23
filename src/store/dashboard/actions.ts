/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { createAsyncAction } from 'typesafe-actions';
import * as models from './models';
import * as types from './types';

export const callDashboardApi = createAsyncAction(
  types.GET_DASHBOARD_API_REQUEST,
  types.GET_DASHBOARD_API_SUCCESS,
  types.GET_DASHBOARD_API_FAILED
)<models.DashboardApiRequest, models.DashboardApiResponse, models.DashboardApiResponse>();

export const makeCallDashboardApi = (request: models.DashboardApiRequest) => callDashboardApi.request(request);
