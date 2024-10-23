/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { AppError } from '../common/error/models';

export type InsightsApiRequest = {
  data1: string;
  data2: string;
};

export type InsightsApiResponse = {
  data1: string;
  data2: string;
};

export type InsightsState = {
  requests: InsightsApiRequest[];
  response: InsightsApiResponse[];
  errors: AppError[];
  data1: string;
};
