/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { TGenderBreakdown, TPlatform } from './type';

export interface IPerformanceValue {
  value: number;
  increase: string;
}

export interface IFacebookAdResult {
  name: string;
  status: string;
  objective: string;
  spend: IPerformanceValue;
  leads: IPerformanceValue;
  costPerLead: IPerformanceValue;
  impressions: IPerformanceValue;
  frequency: IPerformanceValue;
  cpc: IPerformanceValue;
  ctr: IPerformanceValue;
  reach: IPerformanceValue;
  clicks: IPerformanceValue;
  platform: TPlatform;
}

export interface IFacebookAdsAction {
  action_type: string;
  value: string;
}

export interface IPerformanceItems {
  title: string;
  subTitle: string;
  value: number;
  percentage: number;
  increase: string;
  prefix?: string;
  suffix?: string;
}

export interface IPerformanceCard {
  impressions: IPerformanceValue;
  frequency: IPerformanceValue;
  cpc: IPerformanceValue;
  ctr: IPerformanceValue;
}

export interface IFacebookAdResultBreakdown {
  breakdown: string;
  spend: string;
  impressions: string;
  frequency: string;
  cpc: string;
  ctr: string;
  reach: string;
  clicks: string;
}

export interface IFacebookAdResultBreakdownArray {
  breakdown: Array<string>;
  spend: Array<number>;
  impressions: Array<number>;
  ctr: Array<number>;
  clicks: Array<number>;
}

export interface IActiveBreakdown {
  breakdown: TGenderBreakdown;
  value: Array<number>;
}

export interface IButtonBreakdown {
  breakdown: TGenderBreakdown;
  label: string;
}

export interface IDailyReport {
  date: Date;
  count: number;
}

export interface IFacebookAdResultRange {
  spend: Array<IDailyReport>;
  leads: Array<IDailyReport>;
  costPerLead: Array<IDailyReport>;
  impressions: Array<IDailyReport>;
  frequency: Array<IDailyReport>;
  cpc: Array<IDailyReport>;
  ctr: Array<IDailyReport>;
  reach: Array<IDailyReport>;
  clicks: Array<IDailyReport>;
}
