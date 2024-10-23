/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { Theme } from '@material-ui/core/styles';
import { EnhancedTableHeadProps } from 'types';
import {
  GalleryMedia,
  GalleryState,
  GalleryMediasApiRequest,
  Tag,
  AddAccountTagApiRequest,
  DeleteAccountTagApiRequest,
  MediaTagApiRequest
} from 'store/gallery/main/models';
import { GalleryView } from 'store/gallery/main/types';
import { FilterState } from 'store/gallery/filter/models';

export type GalleryProps = {
  state: GalleryState;
  filterState: FilterState;
  selectedMedias: GalleryMedia[];
  doCallGalleryMediasApi: (request: GalleryMediasApiRequest) => void;
  doCallGalleryDeleteMediasApi: (mediaIds: string[]) => void;
  doCallAccountTagsApi: (userId: string) => void;
  doCallAddAccountTagApi: (request: AddAccountTagApiRequest) => void;
  doCallDeleteAccountTagApi: (request: DeleteAccountTagApiRequest) => void;
  doCallAddMediaTagApi: (request: MediaTagApiRequest) => void;
  doCallDeleteMediaTagApi: (request: MediaTagApiRequest) => void;
  doClearDeleteMediasReqStatus: () => void;
  doClearAddAccountTagReqStatus: () => void;
  doClearDeleteAccountTagReqStatus: () => void;
  doClearAddMediaTagReqStatus: (request: MediaTagApiRequest) => void;
  doClearDeleteMediaTagReqStatus: (request: MediaTagApiRequest) => void;
  doSwitchGalleryView: (view: GalleryView) => void;
  doSelectGalleryMedia: (index: number) => void;
  doSelectAllGalleryMedia: () => void;
  doUnselectAllGalleryMedia: () => void;
  doOpenUploadDropzone: (open: boolean) => void;
  doOpenUnsplashDialog: (open: boolean) => void;
  doOpenManageTagsDialog: (open: boolean) => void;
  doOpenMediaDetailsDialog: (index: number) => void;
};

export type ViewListProps = {
  medias: GalleryMedia[];
  page: number;
  pages: number;
  selectedMedias: GalleryMedia[];
  onSelectMedia: (index: number) => void;
  onSelectAllMedia: () => void;
  onUnselectAllMedia: () => void;
  onChangePage: (page: number) => void;
  onClickMedia: (index: number) => void;
  onDeleteMedia: (id: string) => void;
};

export interface ViewListHeadProps extends EnhancedTableHeadProps {
  theme: Theme;
}

export type ViewListBodyProps = {
  medias: GalleryMedia[];
  onSelectMedia: (index: number) => void;
  onClickMedia: (index: number) => void;
  onDeleteMedia: (id: string) => void;
};

export type ViewGridProps = {
  medias: GalleryMedia[];
  page: number;
  pages: number;
  onSelectMedia: (index: number) => void;
  onChangePage: (page: number) => void;
  onClickMedia: (index: number) => void;
};

export type ViewGridItemProps = {
  index: number;
  media: GalleryMedia;
  onSelectMedia: (index: number) => void;
  onClickMedia: (index: number) => void;
};

export type GridCheckBoxProps = {
  checked: boolean;
  onClick: () => void;
};

export type ManageTagsDialogProps = {
  currentTags: Tag[];
  open: boolean;
  onAddTag: (tagLabel: string) => void;
  onRemoveTag: (tagId: string) => void;
  onCloseDialog: () => void;
};

export type MediaDetailsDialogProps = {
  media?: GalleryMedia;
  tags: Tag[];
  onCloseDialog: () => void;
  onOpenManageTags: () => void;
};

export type EditTagsDropdownProps = {
  tags: Tag[];
  anchorEl: any;
  selectedMedias: GalleryMedia[];
  onClose: () => void;
  onOpenManageTagsDialog: () => void;
  onAddTag: (tag: string) => void;
  onDeleteTag: (tag: string) => void;
};

export type TagUsage = {
  tag: string;
  count: number;
};
