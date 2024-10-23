/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { AppError } from '../../common/error/models';

export type BillingApiRequest = {
  data1: string;
  data2: string;
};

export type BillingApiResponse = {
  data1: string;
  data2: string;
};

export type BillingState = {
  requests: BillingApiRequest[];
  response: BillingApiResponse[];
  errors: AppError[];
  data1: string;
};
