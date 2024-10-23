/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  Grid,
  CardMedia,
  IconButton,
  Typography,
  Button,
  TextField,
  Autocomplete,
  InputAdornment,
  Chip,
  CircularProgress
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { IconPencil, IconTrash, IconCheck } from '@tabler/icons';
import { MediaDetailsDialogProps } from './types';
import { useLazyQuery, useMutation } from '@apollo/client';
import gql from 'store/gallery/main/gql';

const MediaDetailsDialog = (props: MediaDetailsDialogProps) => {
  const { media, tags, onCloseDialog, onOpenManageTags } = props;
  const theme = useTheme();
  const [isMediaCaptionSaving, setIsMediaCaptionSaving] = useState(false);
  const [isMediaCaptionSaved, setIsMediaCaptionSaved] = useState(false);
  const [getMedia, { data: mediaData, loading: mediaLoading }] = useLazyQuery(gql.query.getMediaById, { fetchPolicy: 'network-only' });
  const [updateMediaCaption] = useMutation(gql.mutation.updateMedia, { fetchPolicy: 'network-only' });

  const postedColor = {
    bgcolor: theme.palette.success.light,
    color: theme.palette.success.dark
  };

  const scheduledColor = {
    bgcolor: theme.palette.warning.light,
    color: theme.palette.warning.dark
  };

  const unusedColor = {
    bgcolor: theme.palette.primary[800],
    color: theme.palette.primary.light
  };

  useEffect(() => {
    getMedia({
      variables: {
        id: media?.id
      }
    });
  }, [media]);

  const getStatusChip = (status: string | undefined) => {
    const chip = (label: any, color: any) => (
      <Chip
        label={label}
        sx={{
          ...color,
          '&:hover': color
        }}
      />
    );
    switch (status) {
      case 'posted':
        return chip('Posted', postedColor);
      case 'scheduled':
        return chip('Scheduled', scheduledColor);
      default:
        return chip('Unused', unusedColor);
    }
  };

  const handleCaptionEnter = async (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setIsMediaCaptionSaving(true);
      await updateMediaCaption({
        variables: {
          id: media?.id,
          input: {
            caption: e.target.value
          }
        }
      });
      setIsMediaCaptionSaving(false);
      setIsMediaCaptionSaved(true);

      setTimeout(() => {
        setIsMediaCaptionSaved(false);
      }, 1500);
    }
  };

  return (
    <Dialog open={media !== undefined} maxWidth="md" onClose={onCloseDialog}>
      <DialogTitle sx={{ padding: ' 10px 20px 10px 20px' }}>
        <Grid container justifyContent="space-between">
          <Grid item>Media Details</Grid>
          <Grid item>{getStatusChip(media?.status)}</Grid>
        </Grid>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ width: '660px' }}>
        <Grid container columnSpacing={3}>
          <Grid item xs={6}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <CardMedia component="img" src={media?.link} sx={{ width: '300px', height: '300px' }} />
              </Grid>
              <Grid item xs={12} container spacing={1}>
                <Grid item>
                  <IconButton aria-label="edit" size="small">
                    <IconPencil />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton aria-label="delete" size="small">
                    <IconTrash />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h6">Add a caption to your media and pressing enter</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="caption-input"
                    type="text"
                    multiline
                    fullWidth
                    defaultValue={mediaData?.caption}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          {isMediaCaptionSaving ? (
                            <CircularProgress size={25} />
                          ) : isMediaCaptionSaved ? (
                            <IconCheck style={{ color: '#00b341' }} />
                          ) : (
                            <IconPencil />
                          )}
                        </InputAdornment>
                      )
                    }}
                    onKeyDown={handleCaptionEnter}
                    disabled={isMediaCaptionSaving}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h6">Keep your library organised by tagging your content</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    fullWidth
                    id="tags-outlined"
                    options={tags.map((i) => i.label)}
                    getOptionLabel={(option: string) => option}
                    filterSelectedOptions
                    renderInput={(params) => <TextField {...params} placeholder="Select Tags" />}
                    defaultValue={media?.tags}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button variant="text" color="primary" size="small" sx={{ fontWeight: 400 }} onClick={onOpenManageTags}>
                  Manage Tags
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default MediaDetailsDialog;
