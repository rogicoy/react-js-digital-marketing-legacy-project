/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { SelectMediaFile, SelectMediaFiles, SelectMediasApiRequest, SelectMediaState } from 'store/select-media/main/models';

export type GridCheckBoxProps = {
  checked: boolean;
  onClick: () => void;
};

export type SelectMediaProps = {
  doCallSelectMediasApi: (request: SelectMediasApiRequest) => void;
  doMakeSelectMediaFile: (file: SelectMediaFile) => void;
  doMakeSelectMediaFiles: (files: SelectMediaFiles) => void;
  onClose?: () => void;
  onInsertMedia?: (file?: SelectMediaFile) => void;
  open: boolean;
  selectedMedias: SelectMediaFile[];
  state: SelectMediaState;
  isMultiple?: boolean;
};

export type ViewGridProps = {
  medias: SelectMediaFile[];
  page: number;
  pages: number;
  selectedMediaFile?: SelectMediaFile | SelectMediaFiles;
  onSelectMedia: any;
  onChangePage: (page: number) => void;
  isMultiple?: boolean;
};

export type ViewGridItemProps = {
  index: number;
  media: SelectMediaFile;
  isSelected: boolean;
  onSelectMedia: any;
};
