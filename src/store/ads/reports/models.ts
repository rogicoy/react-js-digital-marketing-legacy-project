/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { CampaignStatus } from './types';

export type CampaignReport = {
  id: string;
  name: string;
  image: string;
  link: string;
  type: string;
  startDate: string;
  endDate: string;
  totalSpent: number;
  impressions: number;
  clicks: number;
  reach: number;
  frequency: number;
  cpr: number;
  status: CampaignStatus;
};

export type AdsReportsState = {
  campaignReports: CampaignReport[];
  isLoading: boolean;
};
