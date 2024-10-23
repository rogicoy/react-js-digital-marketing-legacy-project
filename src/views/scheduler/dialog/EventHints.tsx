/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';

// material ui
import { Box, Typography } from '@material-ui/core';

const EventHints: FC = () => (
  <Box
    sx={{
      background: 'linear-gradient(#7F66EB 0%, #9618F7 100%)',
      borderRadius: '10px',
      padding: '20px'
      // height: '100%',
      // gap: 5
    }}
  >
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <div>&#128077;</div>
      <Typography variant="h3" sx={{ color: '#ffffff' }}>
        Helpul Hints
      </Typography>
    </Box>

    <Box sx={{ mt: 2.5 }}>
      <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>
        Available post types
      </Typography>
      <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 'normal' }}>
        Lorem ipsum Lorem ipsum Lorem ipsum
      </Typography>
    </Box>

    <Box sx={{ mt: 2.5 }}>
      <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>
        How often should I post?
      </Typography>
      <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 'normal' }}>
        Lorem ipsum Lorem ipsum Lorem ipsum
      </Typography>
    </Box>

    <Box sx={{ mt: 2.5 }}>
      <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>
        Choosing the best content.
      </Typography>
      <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 'normal' }}>
        Lorem ipsum Lorem ipsum Lorem ipsum
      </Typography>
    </Box>
  </Box>
);

export default EventHints;
