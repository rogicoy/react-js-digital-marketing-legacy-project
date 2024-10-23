/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { AppError } from '../../common/error/models';

export type SecurityApiRequest = {
  data1: string;
  data2: string;
};

export type SecurityApiResponse = {
  data1: string;
  data2: string;
};

export type SecurityState = {
  requests: SecurityApiRequest[];
  response: SecurityApiResponse[];
  errors: AppError[];
  data1: string;
};
