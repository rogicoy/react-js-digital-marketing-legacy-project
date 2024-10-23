/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { Grid, Pagination } from '@material-ui/core';
import { GalleryMedia } from 'store/gallery/main/models';
import { ViewGridProps } from './types';
import ViewGridItem from './ViewGridItem';

const ViewGrid = (props: ViewGridProps) => {
  const { medias, page, pages, onSelectMedia, onChangePage, onClickMedia } = props;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} container spacing={1}>
        {medias.map((media: GalleryMedia, index: number) => (
          <ViewGridItem index={index} media={media} onSelectMedia={onSelectMedia} onClickMedia={onClickMedia} />
        ))}
      </Grid>
      <Grid item xs={12} container justifyContent="flex-end">
        <Pagination count={pages} page={page} size="small" onChange={(event, targetPage) => onChangePage(targetPage)} />
      </Grid>
    </Grid>
  );
};

export default ViewGrid;
