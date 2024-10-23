/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { Grid, Typography, Button, Select, MenuItem, InputLabel, FormControl, Autocomplete, TextField } from '@material-ui/core';
import { FilterProps } from './types';
import { Tag } from 'store/gallery/main/models';
import { useEffect } from 'react';

const Container = (props: FilterProps) => {
  const { tags, selectedTags, isManageTagsDialogOpen, doUpdateSelectedTags, onUpdateSelectedTags, openManageTagsDialog } = props;

  const handleOpenManageTagsDialog = () => {
    if (!isManageTagsDialogOpen) {
      openManageTagsDialog(true);
    }
  };

  const handleOnSelectTag = (event: any, value: string[]) => {
    doUpdateSelectedTags(tags.filter((tag: Tag) => value.indexOf(tag.label) > -1));
  };

  useEffect(() => {
    onUpdateSelectedTags();
  }, [selectedTags]);

  return (
    <Grid container spacing={2} sx={{ marginTop: -3 }}>
      <Grid item xs={12} container alignItems="center">
        <Grid item xs>
          <Typography variant="h4">Filter Media</Typography>
        </Grid>
        <Grid item xs="auto">
          <Button variant="text" color="primary" size="small" sx={{ fontWeight: 400 }}>
            Reset
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="filter-media-type-label">Media Type</InputLabel>
            <Select id="filter-media-type" labelId="filter-media-type-Label" label="media type" fullWidth>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="image">Image</MenuItem>
              <MenuItem value="video">Video</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="filter-post-status-label">Post Status</InputLabel>
            <Select id="filter-post-status" labelId="filter-post-status-Label" label="Post Status" fullWidth>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="unused">Unused</MenuItem>
              <MenuItem value="posted">Posted</MenuItem>
              <MenuItem value="scheduled">Scheduled</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item xs={12} container spacing={1} alignItems="center">
        <Grid item xs={12} container alignItems="center">
          <Grid item xs>
            <Typography variant="h5">My Tags</Typography>
          </Grid>
          <Grid item xs="auto">
            <Button variant="text" color="primary" size="small" sx={{ fontWeight: 400 }} onClick={handleOpenManageTagsDialog}>
              Manage Tags
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            autoHighlight
            id="tags-outlined"
            options={tags.map((tag: Tag) => tag.label)}
            defaultValue={selectedTags.map((tag: Tag) => tag.label)}
            getOptionLabel={(option: string) => option}
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} placeholder="Select Tags" />}
            onChange={handleOnSelectTag}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Container;
