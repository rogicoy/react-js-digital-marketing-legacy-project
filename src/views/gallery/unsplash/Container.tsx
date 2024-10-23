/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useEffect, useState } from 'react';
import { Dialog, AppBar, Toolbar, Typography, SlideProps, Slide, IconButton, Grid, TextField, InputAdornment } from '@material-ui/core';
import { Waypoint } from 'react-waypoint';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import { GalleryUnsplashProps } from './types';
import ImageMasonry from './ImageMasonry';

const Transition = React.forwardRef((slideProps: SlideProps, ref) => <Slide direction="up" ref={ref} {...slideProps} />);

const Container = (props: GalleryUnsplashProps) => {
  const {
    state,
    open,
    addedUnsplashImages,
    doCallUnsplashApi,
    doCallUnsplashUploadApi,
    doChangeUnsplashImageStatus,
    doClearUnsplashImages,
    doOnClose
  } = props;
  const [search, setSearch] = useState('');

  const callUnsplashApi = (page: number, query: string = 'all') =>
    doCallUnsplashApi({
      filter: {
        query,
        page,
        perPage: 24
      }
    });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      doClearUnsplashImages();
      if (open) {
        if (search.trim().length > 0) {
          callUnsplashApi(1, search);
        } else {
          callUnsplashApi(1);
        }
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    if (open) {
      callUnsplashApi(1);
    } else {
      doClearUnsplashImages();
    }
  }, [open]);

  const handleScroll = () => {
    const { length } = state.images;
    const { page } = state.filter;
    if (length > 0 && length % 24 === 0) {
      if (search.trim().length > 0) {
        callUnsplashApi(page + 1, search);
      } else {
        callUnsplashApi(page + 1);
      }
    }
  };

  const handleUploadLink = (id: string, link: string) => doCallUnsplashUploadApi({ link });

  const updateImageStatus = (id: string) => {
    const index = addedUnsplashImages.findIndex((image) => image.id === id);
    if (index > -1) {
      doChangeUnsplashImageStatus(id, 'added');
    }
  };

  return (
    <Dialog fullScreen open={open} onClose={() => doOnClose()} TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => doOnClose()} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h2" color="inherit">
            Royalty Free Image
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} sx={{ padding: '50px' }}>
        <Grid item xs={12} container alignContent="center" justifyContent="center">
          <Typography variant="h1">Need inspiration? Add an image from our Royalty Free database!</Typography>
        </Grid>
        <Grid item xs={12} container alignContent="center" justifyContent="center">
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              )
            }}
            onChange={(tf) => setSearch(tf.currentTarget.value)}
            placeholder="Search"
            size="small"
            sx={{ width: '400px' }}
          />
        </Grid>
        <Grid item xs={12}>
          <ImageMasonry images={state.images} action={{ handleUploadLink, updateImageStatus }} />
        </Grid>
      </Grid>
      <Waypoint onEnter={handleScroll} />
    </Dialog>
  );
};

export default Container;
