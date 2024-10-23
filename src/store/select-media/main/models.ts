/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { SelectMediaFileSource, SelectMediaFileType, SelectMediaFileStatus, RequestStatus } from './types';
import { DateRange, DatePreset } from 'types';

export enum PaginatorSortingType {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type Paginator = {
  page?: number;
  search?: string;
  dateRange?: DateRange;
  datePreset?: DatePreset;
  perPage?: number;
  sortBy?: string;
  sortByType?: PaginatorSortingType;
};

export type PagerInput = {
  search?: string;
  page: number;
  limit?: number;
  order?: string;
  sort?: string;
};

export type SelectMediaFilterInput = {
  media?: string;
  tags?: string[];
  status?: string;
};

export type SelectMediasApiRequest = {
  filter?: SelectMediaFilterInput;
  paginator?: Paginator;
};

export type SelectMediaFile = {
  id: string;
  name: string;
  description: string;
  type: SelectMediaFileType;
  media: string;
  mediaFrame?: string;
  size: number;
  link: string;
  status: SelectMediaFileStatus;
  tags: string[];
  source?: MediaSource;
  selected: boolean;
};

export type SelectMediaFiles = any;

export type SelectMediasApiResponse = {
  currentPage: number;
  medias: SelectMediaFile[];
  perPage: number;
  pages: number;
  totalCount: number;
};

export type SelectMediaTag = {
  id: string;
  label: string;
};

export type SelectMediaState = {
  medias: SelectMediaFile[];
  tags: SelectMediaTag[];
  currentPage: number;
  pages: number;
  totalCount: number;
  perPage: number;
  selectMediasApiLoading: boolean;
  selectedMediaFile?: SelectMediaFile;
  selectedMediaFiles?: SelectMediaFiles;
};
