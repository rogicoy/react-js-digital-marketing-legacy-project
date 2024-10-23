/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { AppError } from '../../common/error/models';

export type NewAdApiRequest = {
  data1: string;
  data2: string;
};

export type NewAdApiResponse = {
  data1: string;
  data2: string;
};

export type Objective = 'BRAND_AWARENESS' | 'LEAD_GENERATION' | 'LINK_CLICKS' | 'POST_ENGAGEMENT' | 'REACH' | '';

export type BudgetType = 'DAILY' | 'WEEKLY' | 'MONTHLY';

export type Status = 'PENDING' | 'ONGOING' | 'DONE';

export type FacebookCampaign = {
  id?: string;
  objective?: Objective | string;
  name?: string;
  categories?: string;
  budget?: number | string;
  budgetType?: BudgetType | string;
  startDate?: Date | string;
  endDate?: Date | string;
  status: Status | string;
};

export type NewAdState = {
  requests: NewAdApiRequest[];
  response: NewAdApiResponse[];
  errors: AppError[];
  data1: string;
  facebookCampaign: FacebookCampaign;
};
