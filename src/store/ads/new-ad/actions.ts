/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { createAction, createAsyncAction } from 'typesafe-actions';
import { AppError } from '../../common/error/models';
import * as models from './models';
import * as types from './types';

export const callNewAdApi = createAsyncAction(types.GET_NEW_AD_API_REQUEST, types.GET_NEW_AD_API_SUCCESS, types.GET_NEW_AD_API_FAILED)<
  models.NewAdApiRequest,
  models.NewAdApiResponse,
  AppError
>();

export const updateData1 = createAction(types.UPDATE_DATA1, (data: string) => data)();

export const makeCallNewAdApi = (request: models.NewAdApiRequest) => callNewAdApi.request(request);

export const makeUpdateData = (data: string) => updateData1(data);

export const callFacebookCampaignApi = createAsyncAction(
  types.CREATE_FACEBOOK_CAMPAIGN_REQUEST,
  types.CREATE_FACEBOOK_CAMPAIGN_SUCCESS,
  types.CREATE_FACEBOOK_CAMPAIGN_FAILED
)<any, any, AppError>();

export const makeFacebookCampaign = (request: any) => callFacebookCampaignApi.request(request);
