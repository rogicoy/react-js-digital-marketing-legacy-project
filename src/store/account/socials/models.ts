/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { AppError } from '../../common/error/models';

export type SocialsApiRequest = {
  data1: string;
  data2: string;
};

export type SocialsApiResponse = {
  data1: string;
  data2: string;
};

export type SocialsState = {
  requests: SocialsApiRequest[];
  response: SocialsApiResponse[];
  errors: AppError[];
  data1: string;
};
