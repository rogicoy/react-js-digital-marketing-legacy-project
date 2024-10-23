/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { GalleryView, MediaSource, MediaType, MediaStatus, RequestStatus } from './types';
import { DateRange, DatePreset } from 'types';

export enum PaginatorSortingType {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type MediaFilterInput = {
  media?: string;
  tags?: string[];
  status?: string;
};

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

export type GalleryMediasApiRequest = {
  filter?: MediaFilterInput;
  paginator?: Paginator;
};

export type GalleryMedia = {
  id: string;
  name: string;
  description: string;
  type: string;
  media: string;
  mediaFrame?: string;
  size: number;
  link: string;
  status: MediaStatus;
  tags: string[];
  source?: MediaSource;
  selected: boolean;
  caption: string;
};

export type GalleryMediasApiResponse = {
  currentPage: number;
  medias: GalleryMedia[];
  perPage: number;
  pages: number;
  totalCount: number;
};

export type DeleteMediaRequestStatus = {
  ids: string[];
  status: RequestStatus;
};

export type Tag = {
  id: string;
  label: string;
};

export type AddAccountTagApiRequest = {
  tag: string;
};

export type AddAccountTagRequestStatus = {
  tag: string;
  status: RequestStatus;
};

export type DeleteAccountTagApiRequest = {
  id: string;
};

export type DeleteAccountTagRequestStatus = {
  id: string;
  status: RequestStatus;
};

export type MediaTagApiRequest = {
  mediaId: string;
  tag: string;
};

export type MediaTagRequestStatus = {
  mediaId: string;
  tag: string;
  status: RequestStatus;
};

export type RefreshMediaTagsParams = {
  mediaId: string;
  nextTags: string[];
};

export type GalleryState = {
  medias: GalleryMedia[];
  tags: Tag[];
  currentPage: number;
  pages: number;
  totalCount: number;
  perPage: number;
  view: GalleryView;
  openUploadDropzone: boolean;
  openUnsplashDialog: boolean;
  openManageTagsDialog: boolean;
  openMediaDetailsDialog: number;
  galleryMediasApiLoading: boolean;
  deleteMediaRequestStatus?: DeleteMediaRequestStatus;
  addAccountTagRequestStatus?: AddAccountTagRequestStatus;
  deleteAccountTagRequestStatus?: DeleteAccountTagRequestStatus;
  addMediaTagRequestStatusLogs: MediaTagRequestStatus[];
  deleteMediaTagRequestStatusLogs: MediaTagRequestStatus[];
};
