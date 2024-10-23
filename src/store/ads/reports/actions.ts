/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { createAsyncAction } from 'typesafe-actions';
import * as models from './models';
import * as types from './types';

export const callAdsReportsApi = createAsyncAction(
  types.GET_ADS_REPORTS_API_REQUEST,
  types.GET_ADS_REPORTS_API_SUCCESS,
  types.GET_ADS_REPORTS_API_FAILED
)<undefined, models.CampaignReport[]>();

export const makeCallAdsReportsApi = () => callAdsReportsApi.request();
