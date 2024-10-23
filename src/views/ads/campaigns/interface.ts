/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { CampaignStatus, ISocialType } from 'types';

export interface ICampaignItem {
  id: number;
  social: ISocialType;
  name: string;
  objective: FbCampaignObjectives;
  status: CampaignStatus;
  website?: string;
  end_date: Date;
  spent: string | null;
  link: string;
}

export interface IFacebookAdsItem {
  id: string;
  activeName: string;
  activeId: string;
  count: number;
  fbId: string;
  fbName: string;
  fbPic: string;
}

export type FbCampaignObjectives =
  | 'NONE'
  | 'APP_INSTALLS'
  | 'AD_RECALL_LIFT'
  | 'ENGAGED_USERS'
  | 'EVENT_RESPONSES'
  | 'IMPRESSIONS'
  | 'LEAD_GENERATION'
  | 'QUALITY_LEAD'
  | 'LINK_CLICKS'
  | 'OFFSITE_CONVERSIONS'
  | 'PAGE_LIKES'
  | 'POST_ENGAGEMENT'
  | 'QUALITY_CALL'
  | 'REACH'
  | 'LANDING_PAGE_VIEWS'
  | 'VISIT_INSTAGRAM_PROFILE'
  | 'VALUE'
  | 'THRUPLAY'
  | 'DERIVED_EVENTS'
  | 'APP_INSTALLS_AND_OFFSITE_CONVERSIONS'
  | 'CONVERSATIONS'
  | 'IN_APP_VALUE';
