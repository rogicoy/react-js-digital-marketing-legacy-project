/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { Checkbox, TableBody, TableRow, TableCell, CardMedia, Grid, IconButton } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { IconPencil, IconTrash } from '@tabler/icons';
import { GalleryMedia } from 'store/gallery/main/models';
import Chip from 'ui-component/extended/Chip';
import { ViewListBodyProps } from './types';

const ViewListBody = (props: ViewListBodyProps) => {
  const { medias, onSelectMedia, onClickMedia, onDeleteMedia } = props;
  const theme = useTheme();

  const tagColor = {
    bgcolor: theme.palette.secondary.light,
    color: theme.palette.secondary.main
  };

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

  const tagStyle = {
    ...tagColor,
    '&:hover': tagColor
  };

  const getStatusChip = (status: String) => {
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

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

  return (
    <TableBody>
      {medias.map((media: GalleryMedia, index: number) => (
        <TableRow hover role="checkbox" aria-checked={false} tabIndex={-1} key={`list-${index}`} selected={false}>
          <TableCell padding="checkbox" sx={{ pl: 3 }} onClick={() => {}}>
            <Checkbox
              checked={media.selected}
              inputProps={{
                'aria-label': media.name
              }}
              onClick={() => onSelectMedia(index)}
            />
          </TableCell>
          <TableCell>
            <CardMedia component="img" sx={{ height: 100, width: 100, cursor: 'pointer' }} image={media.link} alt={media.name} />
          </TableCell>
          <TableCell>{media.description}</TableCell>
          <TableCell>
            <Grid container spacing={1}>
              {media.tags.map((tag: string) => (
                <Grid item>
                  <Chip label={tag} sx={tagStyle} />
                </Grid>
              ))}
            </Grid>
          </TableCell>
          <TableCell>{getStatusChip(media.status)}</TableCell>
          <TableCell>
            <Grid container alignItems="center" justifyContent="flex-start">
              <Grid item>
                <IconButton aria-label="edit" size="small" onClick={() => onClickMedia(index)}>
                  <IconPencil />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton aria-label="delete" size="small" onClick={() => onDeleteMedia(media.id)}>
                  <IconTrash />
                </IconButton>
              </Grid>
            </Grid>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default ViewListBody;
