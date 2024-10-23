/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { Tag } from 'store/gallery/main/models';

export type FilterProps = {
  tags: Tag[];
  selectedTags: Tag[];
  isManageTagsDialogOpen: boolean;
  doUpdateSelectedTags: (tags: Tag[]) => void;
  onUpdateSelectedTags: () => void;
  openManageTagsDialog: (open: boolean) => void;
};
