/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Grid, Typography, Button, Menu, MenuItem, Checkbox, FormControlLabel } from '@material-ui/core';
import { Tag } from 'store/gallery/main/models';
import { EditTagsDropdownProps, TagUsage } from './types';

const EditTagsDropdown = (props: EditTagsDropdownProps) => {
  const { tags, anchorEl, selectedMedias, onClose, onOpenManageTagsDialog, onAddTag, onDeleteTag } = props;
  const [tagUsageLog, setTagUsageLog] = useState<TagUsage[]>([]);
  const theme = useTheme();

  const handleOnSelectTag = (checked: boolean, tag: string) => {
    if (checked) {
      onAddTag(tag);
    } else {
      onDeleteTag(tag);
    }
  };

  useEffect(() => {
    const nextTagUsageLog: TagUsage[] = [];
    selectedMedias.forEach((media) => {
      media.tags.forEach((tag) => {
        const index = nextTagUsageLog.findIndex((tul) => tul.tag === tag);

        if (index > -1) {
          nextTagUsageLog[index].count += 1;
        } else {
          nextTagUsageLog.push({ tag, count: 1 });
        }
      });
    });
    setTagUsageLog(nextTagUsageLog);
  }, [selectedMedias]);

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
    >
      <Grid container sx={{ width: '240px' }}>
        <Grid item xs={12} sx={{ padding: '5px 8px 0px 8px' }}>
          <Typography variant="h5" sx={{ padding: '0px 12px 0px 12px' }}>
            Add or remove tags to media
          </Typography>
          <Button variant="text" color="primary" size="small" sx={{ fontWeight: 400 }} onClick={onOpenManageTagsDialog}>
            Manage Tags
          </Button>
        </Grid>
        <Grid item xs={12}>
          {tags.map((tag: Tag) => {
            const tulIndex = tagUsageLog.findIndex((tul) => tul.tag === tag.label);
            const checkboxColor =
              tulIndex > -1
                ? tagUsageLog[tulIndex].count === selectedMedias.length
                  ? theme.palette.primary.main
                  : theme.palette.deepPurple[200]
                : undefined;
            return (
              <MenuItem key={tag.id} onClick={() => {}} sx={{ padding: '0px 5px 0px 5px' }}>
                <FormControlLabel
                  checked={tulIndex > -1}
                  control={
                    <Checkbox
                      sx={{
                        color: checkboxColor,
                        '&.Mui-checked': {
                          color: checkboxColor
                        }
                      }}
                      onChange={(e: any) => handleOnSelectTag(e.target.checked, tag.label)}
                    />
                  }
                  label={tag.label}
                  sx={{ width: '100%', margin: '0px' }}
                />
              </MenuItem>
            );
          })}
        </Grid>
      </Grid>
    </Menu>
  );
};

export default EditTagsDropdown;
