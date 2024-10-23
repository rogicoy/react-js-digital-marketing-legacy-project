/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { AppError } from '../../common/error/models';

export type AdsLeadsApiRequest = {};

export type AdsLeadsApiResponse = {};

export type AdsLeadsState = {
  requests: AdsLeadsApiRequest[];
  response: AdsLeadsApiResponse[];
  errors: AppError[];
};
