/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, Grid, Typography, Button, TextField, InputAdornment, IconButton, Collapse } from '@material-ui/core';
import { IconPlus, IconSearch, IconGridDots, IconList, IconTrash, IconTag } from '@tabler/icons';
import SearchIcon from '@material-ui/icons/Search';
import MainCard from 'ui-component/cards/MainCard';
import { GalleryProps } from './types';
import useAuth from 'hooks/useAuth';
import ViewGrid from './ViewGrid';
import ViewList from './ViewList';
import GalleryFilter from './filter';
import GalleryDropzone from './dropzone';
import GalleryUnsplash from './unsplash';
import ManageTagsDialog from './ManageTagsDialog';
import MediaDetailsDialog from './MediaDetailsDialog';
import EditTagsDropdown from './EditTagsDropdown';
import { GalleryMedia, PaginatorSortingType } from 'store/gallery/main/models';

const useStyles = makeStyles((theme: Theme) => ({
  titleButtonIcons: {
    width: 20
  },
  actionButton: {
    borderRadius: '2rem',
    border: `none`,
    color: `#000000`,
    minWidth: 44,
    minHeight: 44,
    '&:hover': {
      border: `none`,
      background: theme.palette.grey[100]
    }
  },
  activeToggleButton: {
    color: theme.palette.primary.main
  },
  inactiveToggelButton: {
    color: '#000000'
  }
}));

const Container = (props: GalleryProps) => {
  const {
    state,
    filterState,
    selectedMedias,
    doCallGalleryMediasApi,
    doCallGalleryDeleteMediasApi,
    doCallAccountTagsApi,
    doCallAddAccountTagApi,
    doCallDeleteAccountTagApi,
    doCallAddMediaTagApi,
    doCallDeleteMediaTagApi,
    doClearDeleteMediasReqStatus,
    doClearAddAccountTagReqStatus,
    doClearDeleteAccountTagReqStatus,
    doClearAddMediaTagReqStatus,
    doClearDeleteMediaTagReqStatus,
    doSwitchGalleryView,
    doSelectGalleryMedia,
    doSelectAllGalleryMedia,
    doUnselectAllGalleryMedia,
    doOpenUploadDropzone,
    doOpenUnsplashDialog,
    doOpenManageTagsDialog,
    doOpenMediaDetailsDialog
  } = props;
  const classes = useStyles();
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const fetchMedias = (page: number) => {
    if (user?.id !== undefined) {
      doCallGalleryMediasApi({
        filter: {
          tags: state.tags.filter((tag) => filterState.selectedTags.indexOf(tag) > -1).map((tag) => tag.label)
        },
        paginator: {
          page: page || 1,
          sortBy: 'createdAt',
          sortByType: PaginatorSortingType.DESC,
          perPage: 12
        }
      });
    }
  };

  const fetchAccountTags = () => {
    if (user?.id !== undefined) {
      doCallAccountTagsApi(user?.id);
    }
  };

  const handleOpenEditTagsDropdown = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseEditTagsDropdown = () => {
    setAnchorEl(null);
  };

  const handleOpenManageTagsDialog = () => {
    if (!state.openManageTagsDialog) {
      doOpenManageTagsDialog(true);
    }
  };

  const handleDeleteMedias = () => {
    if (selectedMedias.length > 0) {
      doCallGalleryDeleteMediasApi(selectedMedias.map((media) => media.id));
    }
  };

  const handleOpenMediaDetailsDialog = () =>
    state.openMediaDetailsDialog > -1 && state.openMediaDetailsDialog < state.medias.length
      ? state.medias[state.openMediaDetailsDialog]
      : undefined;

  const handleAddAccountTag = (tag: string) => {
    if (user?.id !== undefined) {
      doCallAddAccountTagApi({ tag });
    }
  };

  const handleDeleteAccountTag = (id: string) => {
    if (user?.id !== undefined) {
      doCallDeleteAccountTagApi({ id });
    }
  };

  const handleAddMediaTag = (tag: string) => selectedMedias.map((media: GalleryMedia) => doCallAddMediaTagApi({ mediaId: media.id, tag }));

  const handleDeleteMediaTag = (tag: string) =>
    selectedMedias.map((media: GalleryMedia) => doCallDeleteMediaTagApi({ mediaId: media.id, tag }));

  useEffect(() => {
    fetchMedias(1);
    fetchAccountTags();
  }, []);

  const handleRequestStatus = (reqStat: any, doOnSuccess: () => void, doOnEnd: () => void) => {
    if (reqStat && reqStat.status !== 'ongoing') {
      if (reqStat.status === 'success') {
        doOnSuccess();
      }
      doOnEnd();
    }
  };

  useEffect(() => {
    handleRequestStatus(
      state.deleteMediaRequestStatus,
      () => fetchMedias(1),
      () => doClearDeleteMediasReqStatus()
    );
  }, [state.deleteMediaRequestStatus]);

  useEffect(() => {
    handleRequestStatus(
      state.addAccountTagRequestStatus,
      () => fetchAccountTags(),
      () => doClearAddAccountTagReqStatus()
    );
  }, [state.addAccountTagRequestStatus]);

  useEffect(() => {
    handleRequestStatus(
      state.deleteAccountTagRequestStatus,
      () => fetchAccountTags(),
      () => doClearDeleteAccountTagReqStatus()
    );
  }, [state.deleteAccountTagRequestStatus]);

  useEffect(() => {
    state.addMediaTagRequestStatusLogs.map((log) =>
      handleRequestStatus(
        log,
        () => {},
        () => doClearAddMediaTagReqStatus({ mediaId: log.mediaId, tag: log.tag })
      )
    );
  }, [state.addMediaTagRequestStatusLogs]);

  useEffect(() => {
    state.deleteMediaTagRequestStatusLogs.map((log) =>
      handleRequestStatus(
        log,
        () => {},
        () => doClearDeleteMediaTagReqStatus({ mediaId: log.mediaId, tag: log.tag })
      )
    );
  }, [state.deleteMediaTagRequestStatusLogs]);

  return (
    <MainCard
      title={
        <Grid container spacing={2}>
          <Grid item xs={12} container alignItems="center" justifyContent="center" spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h1" sx={{ mb: 2, fontSize: '2rem' }}>
                Content Manager
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'normal', lineHeight: 1.5, fontSize: '.9rem' }}>
                Save yourself from double posting by keeping track of your content. Add a description, tags and upload status to your image,
                video or GIF for easy access and record keeping.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} container justifyContent="flex-end" spacing={1}>
              <Grid item>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ width: 210 }}
                  startIcon={<IconSearch className={classes.titleButtonIcons} />}
                  onClick={() => doOpenUnsplashDialog(true)}
                >
                  Royalty Free Image
                </Button>
              </Grid>
              <Grid item>
                <Button
                  disableElevation
                  variant="contained"
                  sx={{ width: 160 }}
                  startIcon={<IconPlus className={classes.titleButtonIcons} />}
                  onClick={() => doOpenUploadDropzone(!state.openUploadDropzone)}
                >
                  Add Media
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Collapse orientation="vertical" in={state.openUploadDropzone}>
              <GalleryDropzone isOpen={state.openUploadDropzone} onUploadSuccess={() => fetchMedias(state.currentPage)} />
            </Collapse>
          </Grid>
        </Grid>
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12} container alignItems="flex-start" justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center" justifyContent="flex-start" spacing={2}>
              <Grid item>
                <Typography variant="h5">{state.totalCount} results</Typography>
              </Grid>
              <Grid item>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                  onChange={() => {}}
                  placeholder="Search"
                  size="small"
                  sx={{ width: '270px' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} alignItems="center" container justifyContent="flex-end" spacing={1}>
            <Grid item>
              {selectedMedias.length > 0 ? (
                <Grid container alignItems="center" justifyContent="center" spacing={1}>
                  <Grid item>
                    <Button
                      aria-label="edit"
                      variant="outlined"
                      size="small"
                      className={classes.actionButton}
                      onClick={handleOpenEditTagsDropdown}
                    >
                      <IconTag style={{ paddingRight: '5px' }} /> Edit tags
                    </Button>
                    <EditTagsDropdown
                      tags={state.tags}
                      anchorEl={anchorEl}
                      selectedMedias={selectedMedias}
                      onClose={handleCloseEditTagsDropdown}
                      onOpenManageTagsDialog={handleOpenManageTagsDialog}
                      onAddTag={handleAddMediaTag}
                      onDeleteTag={handleDeleteMediaTag}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      aria-label="delete"
                      variant="outlined"
                      size="small"
                      className={classes.actionButton}
                      onClick={handleDeleteMedias}
                    >
                      <IconTrash />
                    </Button>
                  </Grid>
                </Grid>
              ) : undefined}
            </Grid>
            <Grid item>
              <Grid container alignItems="center" justifyContent="flex-end">
                <Grid item>
                  <IconButton
                    aria-label="grid"
                    size="small"
                    className={state.view === 'grid' ? classes.activeToggleButton : classes.inactiveToggelButton}
                    onClick={() => doSwitchGalleryView('grid')}
                  >
                    <IconGridDots />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="list"
                    size="small"
                    className={state.view === 'list' ? classes.activeToggleButton : classes.inactiveToggelButton}
                    onClick={() => doSwitchGalleryView('list')}
                  >
                    <IconList />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {state.medias.length > 0 ? (
            state.view === 'grid' ? (
              <Grid container alignItems="flex-start" justifyContent="space-between" spacing={4}>
                <Grid item xs={12} sm={9}>
                  <ViewGrid
                    medias={state.medias}
                    page={state.currentPage}
                    pages={state.pages}
                    onSelectMedia={doSelectGalleryMedia}
                    onChangePage={(targetPage) => fetchMedias(targetPage)}
                    onClickMedia={doOpenMediaDetailsDialog}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <GalleryFilter
                    tags={state.tags}
                    isManageTagsDialogOpen={state.openManageTagsDialog}
                    openManageTagsDialog={(open: boolean) => doOpenManageTagsDialog(open)}
                    onUpdateSelectedTags={() => fetchMedias(1)}
                  />
                </Grid>
              </Grid>
            ) : (
              <ViewList
                medias={state.medias}
                page={state.currentPage}
                pages={state.pages}
                selectedMedias={selectedMedias}
                onSelectMedia={doSelectGalleryMedia}
                onSelectAllMedia={doSelectAllGalleryMedia}
                onUnselectAllMedia={doUnselectAllGalleryMedia}
                onChangePage={(targetPage) => fetchMedias(targetPage)}
                onClickMedia={doOpenMediaDetailsDialog}
                onDeleteMedia={(id: string) => doCallGalleryDeleteMediasApi([id])}
              />
            )
          ) : (
            !state.galleryMediasApiLoading && (
              <Typography sx={{ fontWeight: 'bold' }}>Your content manager is empty. Get started by uploading some images.</Typography>
            )
          )}
        </Grid>
      </Grid>
      <ManageTagsDialog
        currentTags={state.tags}
        open={state.openManageTagsDialog}
        onAddTag={handleAddAccountTag}
        onRemoveTag={handleDeleteAccountTag}
        onCloseDialog={() => doOpenManageTagsDialog(false)}
      />
      <MediaDetailsDialog
        media={handleOpenMediaDetailsDialog()}
        tags={state.tags}
        onCloseDialog={() => doOpenMediaDetailsDialog(-1)}
        onOpenManageTags={handleOpenManageTagsDialog}
      />
      <GalleryUnsplash
        open={state.openUnsplashDialog}
        doOnClose={() => {
          doOpenUnsplashDialog(false);
          fetchMedias(1);
        }}
      />
    </MainCard>
  );
};

export default Container;
