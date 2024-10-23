/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { AdsReportsState, CampaignReport } from 'store/ads/reports/models';

export type AdsReportsProps = {
  state: AdsReportsState;
  doCallAdsReportsApi: () => any;
};

export type CampaignsTableProps = {
  reports: CampaignReport[];
};

export type CampaignRowProps = {
  report: CampaignReport;
};
