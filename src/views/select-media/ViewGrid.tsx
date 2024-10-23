/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { Grid, Pagination } from '@material-ui/core';
import { selectMediaFiles } from 'store/select-media/main/actions';
import { SelectMediaFile } from 'store/select-media/main/models';
import { ViewGridProps } from './types';
import ViewGridItem from './ViewGridItem';

const ViewGrid = (props: ViewGridProps) => {
  const { medias, page, pages, selectedMediaFile, onSelectMedia, onChangePage, isMultiple } = props;

  return (
    <Grid container>
      <Grid item xs={12} container spacing={1}>
        {medias.map((media: SelectMediaFile, index: number) => (
          <ViewGridItem
            key={index}
            index={index}
            media={media}
            isSelected={
              isMultiple
                ? selectedMediaFile?.findIndex((item: SelectMediaFile) => item.id === media.id) !== -1
                : media.id === selectedMediaFile?.id
            }
            onSelectMedia={onSelectMedia}
          />
        ))}
      </Grid>
      <Grid item xs={12} container justifyContent="flex-end" mt={2}>
        <Pagination count={pages} page={page} size="small" onChange={(event, targetPage) => onChangePage(targetPage)} />
      </Grid>
    </Grid>
  );
};

export default ViewGrid;
