/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { ImageListItem, Card, CardMedia, Skeleton, Chip, CardHeader, Box, Button } from '@material-ui/core';
import { IconCloudDownload } from '@tabler/icons';
import { ImageMasonryItemProps } from './types';

const ImageMasonryItem = (props: ImageMasonryItemProps) => {
  const { id, urlRegular, description, width, height, status, action } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = useTheme();

  const addedStatusColor = {
    bgcolor: theme.palette.success.light,
    color: theme.palette.success.dark,
    '&:hover': {
      bgcolor: theme.palette.success.light,
      color: theme.palette.success.dark
    }
  };

  const getStatusChip = (stat: String) => {
    if (stat === 'added') {
      return <Chip label="Added to Library" sx={addedStatusColor} />;
    }
    return undefined;
  };

  useEffect(() => {
    action.updateImageStatus(id);
  }, []);

  return (
    <ImageListItem key={id}>
      <Card
        sx={{
          borderRadius: '0px',
          display: isLoaded ? 'block' : 'none',
          '&:hover': {
            '#addToLibBtn': {
              visibility: 'visible'
            }
          }
        }}
      >
        <CardHeader
          sx={{
            position: 'absolute',
            padding: '20px'
          }}
          title={getStatusChip(status)}
        />
        <CardMedia component="img" image={urlRegular} alt={description} onLoad={() => setIsLoaded(true)} />
        {status === 'unused' && (
          <Box
            id="addToLibBtn"
            sx={{
              position: 'absolute',
              visibility: 'hidden',
              width: '100%',
              top: '42%',
              textAlign: 'center'
            }}
          >
            <Button
              disableElevation
              aria-label="add to library"
              variant="contained"
              startIcon={<IconCloudDownload />}
              onClick={() => action.handleUploadLink(id, urlRegular)}
            >
              Add to Library
            </Button>
          </Box>
        )}
      </Card>
      {!isLoaded && <Skeleton variant="rectangular" width={width} height={height} />}
    </ImageListItem>
  );
};

export default ImageMasonryItem;
