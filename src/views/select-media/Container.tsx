/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import useAuth from 'hooks/useAuth';
import { PaginatorSortingType } from 'store/select-media/main/models';
import { SelectMediaProps } from './types';
import SelectMediaDropzone from './dropzone';
import ViewGrid from './ViewGrid';

const useStyles = makeStyles(() => ({
  dropzoneRoot: {
    marginBottom: '16px'
  },
  actions: {
    marginTop: '16px'
  }
}));

const Container = (props: SelectMediaProps) => {
  const { doCallSelectMediasApi, doMakeSelectMediaFile, doMakeSelectMediaFiles, onClose, onInsertMedia, open, state, isMultiple } = props;
  const { user } = useAuth();
  const classes = useStyles();

  const fetchMedias = (page: number) => {
    if (user?.id !== undefined) {
      doCallSelectMediasApi({
        paginator: {
          page: page || 1,
          sortBy: 'createdAt',
          sortByType: PaginatorSortingType.DESC,
          perPage: 12
        }
      });
    }
  };

  const handleMediaInsert = () => {
    if (onInsertMedia) {
      onInsertMedia(isMultiple ? state.selectedMediaFiles : state.selectedMediaFile);
    }
  };

  useEffect(() => {
    if (open) {
      fetchMedias(1);
    }
  }, [open]);

  return (
    <Dialog open={Boolean(open)} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Select Media</DialogTitle>
      <DialogContent>
        <div className={classes.dropzoneRoot}>
          <SelectMediaDropzone onUploadSuccess={() => fetchMedias(state.currentPage || 1)} />
        </div>
        <ViewGrid
          medias={state.medias}
          page={state.currentPage}
          pages={state.pages}
          selectedMediaFile={isMultiple ? state.selectedMediaFiles : state.selectedMediaFile}
          onSelectMedia={isMultiple ? doMakeSelectMediaFiles : doMakeSelectMediaFile}
          onChangePage={(targetPage) => fetchMedias(targetPage)}
          isMultiple={isMultiple}
        />
        <Grid className={classes.actions} item xs={12} container justifyContent="flex-end">
          <Button
            disableElevation
            variant="contained"
            sx={{ width: 160 }}
            onClick={handleMediaInsert}
            disabled={isMultiple ? state.selectedMediaFiles.length === 0 : !state.selectedMediaFile}
          >
            Insert Media
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default Container;
