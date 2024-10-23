/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { makeStyles } from '@material-ui/styles';
import { Theme, Dialog, DialogTitle, DialogContent, TextField, Typography, Grid, Chip, Divider } from '@material-ui/core';
import { ManageTagsDialogProps } from './types';
import { Tag } from 'store/gallery/main/models';

const useStyles = makeStyles((theme: Theme) => ({
  tagChip: {
    background: theme.palette.secondary.light
  }
}));

const ManageTagsDialog = (props: ManageTagsDialogProps) => {
  const classes = useStyles();
  const { currentTags, open, onAddTag, onRemoveTag, onCloseDialog } = props;

  const handleAddTag = (e: any) => {
    if (e.keyCode === 13) {
      onAddTag(e.target.value);
      e.target.value = '';
    }
  };

  return (
    <Dialog open={open} onClose={onCloseDialog}>
      <DialogTitle sx={{ padding: ' 10px 20px 10px 20px' }}>Manage Tags</DialogTitle>
      <Divider />
      <DialogContent sx={{ width: '400px', padding: '0px' }}>
        <Grid container spacing={2} sx={{ padding: '10px 20px 10px 20px' }}>
          <Grid item xs={12}>
            <Typography variant="h5">Create tags by typing them below and press enter.</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField id="outlined-basic" label="New Tag" variant="outlined" sx={{ width: '360px' }} onKeyDown={handleAddTag} />
          </Grid>
          <Grid item xs={12} container spacing={1}>
            {currentTags.map((tag: Tag) => (
              <Grid item key={tag.id}>
                <Chip label={tag.label} className={classes.tagChip} onDelete={() => onRemoveTag(tag.id)} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ManageTagsDialog;
