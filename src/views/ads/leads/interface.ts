/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { IPageInfo, IPaginator } from 'types';

export type ILeadsStatus = 'SMOKING' | 'HOT' | 'WARM' | 'COOL';
export interface ILeadsTableRow {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
  status: ILeadsStatus;
  source?: string;
}

export interface IFetchLeadsVariables {
  paginator?: IPaginator;
}

export type IFetchLeadsResponse = null | {
  facebookLeads: {
    data: [];
    totalCount?: number;
    pages?: number;
  };
};
