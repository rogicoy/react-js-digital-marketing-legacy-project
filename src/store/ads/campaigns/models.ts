/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { AppError } from '../../common/error/models';

export type AdsCampaignsApiRequest = {
  data1: string;
  data2: string;
};

export type AdsCampaignsApiResponse = {
  data1: string;
  data2: string;
};

export type AdsCampaignsState = {
  requests: AdsCampaignsApiRequest[];
  response: AdsCampaignsApiResponse[];
  errors: AppError[];
  data1: string;
};
