/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Card, Chip, CardMedia, Skeleton, CardHeader, Grid } from '@material-ui/core';
import { ViewGridItemProps } from './types';
import GridCheckBox from './GridCheckBox';
import { imageFileTypes, videoFileTypes } from './dropzone/Container';

const ViewGridItem = (props: ViewGridItemProps) => {
  const { index, media, isSelected, onSelectMedia } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = useTheme();

  const postedColor = {
    bgcolor: theme.palette.success.light,
    color: theme.palette.success.dark
  };

  const scheduledColor = {
    bgcolor: theme.palette.warning.light,
    color: theme.palette.warning.dark
  };

  const getStatusChip = (status: String) => {
    const chip = (label: string, color: any) => (
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
        return undefined;
    }
  };

  return (
    <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
      <Grid
        container
        justifyContent="flex-end"
        sx={{
          '&': {
            position: 'relative'
          },
          '&:hover': {
            '#checkBoxWrap': {
              visibility: 'visible'
            }
          }
        }}
      >
        <Grid item xs={12}>
          <Card
            sx={{
              display: isLoaded ? 'block' : 'none',
              borderRadius: '0px'
            }}
            onClick={() => onSelectMedia(media)}
          >
            <CardHeader
              sx={{
                position: 'absolute',
                padding: '1rem'
              }}
              title={getStatusChip(media.status)}
            />
            {videoFileTypes.includes(media.type) && (
              <CardMedia
                component="video"
                height="200"
                onLoadedMetadata={() => setIsLoaded(true)}
                sx={{ cursor: 'pointer' }}
                controls
                src={media.link}
              />
            )}
            {imageFileTypes.includes(media.type) && (
              <CardMedia
                component="img"
                height="200"
                image={media.link}
                alt={media.name}
                onLoad={() => setIsLoaded(true)}
                sx={{ cursor: 'pointer' }}
              />
            )}
          </Card>
          {!isLoaded && <Skeleton variant="rectangular" height="200px" />}
        </Grid>
        <Grid
          id="checkBoxWrap"
          item
          xs={12}
          sx={{
            position: 'absolute',
            padding: '0.5rem',
            visibility: isSelected ? 'visible' : 'hidden'
          }}
        >
          <GridCheckBox checked={isSelected} onClick={() => onSelectMedia(media)} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ViewGridItem;
