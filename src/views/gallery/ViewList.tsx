/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { useTheme, Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { Grid, Table, TableContainer, Pagination } from '@material-ui/core';
import { visuallyHidden } from '@material-ui/utils';
import ViewListHead from './ViewListHead';
import ViewListBody from './ViewListBody';
import { ViewListProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  sortSpan: { ...visuallyHidden },
  exportIcon: {
    width: 20
  }
}));

const ViewList = (props: ViewListProps) => {
  const {
    medias,
    page,
    pages,
    selectedMedias,
    onSelectMedia,
    onSelectAllMedia,
    onUnselectAllMedia,
    onChangePage,
    onClickMedia,
    onDeleteMedia
  } = props;
  const styles = useStyles();
  const theme = useTheme();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TableContainer>
          <Table className={styles.table} aria-label="content manager">
            <ViewListHead
              theme={theme}
              classes={styles}
              numSelected={selectedMedias.length}
              onSelectAllClick={medias.findIndex((media) => media.selected === false) > -1 ? onSelectAllMedia : onUnselectAllMedia}
              onRequestSort={() => {}}
              rowCount={medias.length}
              order="asc"
              headCells={[
                { id: 'img', label: 'Image' },
                { id: 'desc', label: 'Description' },
                { id: 'tags', label: 'Tags' },
                { id: 'stat', label: 'Status' },
                { id: 'upl', label: 'Uploaded' },
                { id: 'act', label: 'Actions' }
              ]}
            />
            <ViewListBody medias={medias} onSelectMedia={onSelectMedia} onClickMedia={onClickMedia} onDeleteMedia={onDeleteMedia} />
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} container justifyContent="flex-end">
        <Pagination count={pages} page={page} size="small" onChange={(event, targetPage) => onChangePage(targetPage)} />
      </Grid>
    </Grid>
  );
};

export default ViewList;
