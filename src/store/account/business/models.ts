/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { AppError } from '../../common/error/models';

export type BusinessApiRequest = {
  data1: string;
  data2: string;
};

export type BusinessApiResponse = {
  data1: string;
  data2: string;
};

export type BusinessState = {
  requests: BusinessApiRequest[];
  response: BusinessApiResponse[];
  errors: AppError[];
  data1: string;
};
