/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import { ISocialType } from 'types';

// material ui
import { Box, Typography, Button } from '@material-ui/core';

// assets
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const errorLink: {
  [social: string]: string;
} = {
  facebook: 'removed',
  instagram: 'removed',
  twitter: '',
  linkedin: ''
};

const FailedToolTip: FC<{ errorMessage: string; social: ISocialType }> = ({ errorMessage, social }) => {
  const link = errorLink[social] as string;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: '10px' }}>
        <InfoOutlinedIcon
          sx={{
            width: 20,
            height: 20
          }}
          htmlColor="#FF0000"
        />
        <Typography variant="caption" color="#FF0000">
          Your post was unsuccessful
        </Typography>
      </Box>

      <Typography variant="caption" color="#000000" component="div" mb="10px">
        Oh-no! We experienced an error when posting your content:
      </Typography>

      <Typography variant="caption" color="#000000" component="div">
        {errorMessage}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
        <Button variant="text" size="small" sx={{ fontSize: '0.75rem' }} href={link} target="_blank">
          Learn more
        </Button>
      </Box>
    </Box>
  );
};

export default FailedToolTip;
