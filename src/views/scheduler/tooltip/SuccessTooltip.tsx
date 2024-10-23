/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';

// material ui
import { Box, Typography, Button } from '@material-ui/core';

// assets
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';

const SuccessToolTip: FC<{ postLink: string }> = ({ postLink }) => (
  <Box>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: '10px' }}>
      <CheckCircleOutlinedIcon
        sx={{
          width: 20,
          height: 20
        }}
        htmlColor="#008000"
      />
      <Typography variant="caption" color="#008000">
        Post successful
      </Typography>
    </Box>

    <Typography variant="caption" color="#000000">
      Woo-hoo! Your scheduled post was uploaded successfully.
    </Typography>

    <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
      <Button variant="text" size="small" sx={{ fontSize: '0.75rem' }} href={postLink} target="_blank">
        View post
      </Button>
    </Box>
  </Box>
);

export default SuccessToolTip;
