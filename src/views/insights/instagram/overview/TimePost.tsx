/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import { gridSpacing } from 'views/common/constant';

// material ui
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import Overlay from 'ui-component/Overlay';

const TimePost: FC = () => (
  <Card sx={{ backgroundColor: '#874bef', position: 'relative' }}>
    <Overlay>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        Best time to post <br /> Coming soon
      </Typography>
    </Overlay>
    <CardContent>
      <Grid container spacing={gridSpacing} direction="column">
        <Grid item container md={12} alignItems="center">
          <Grid item md={4}>
            <AccessTimeIcon htmlColor="#ffffff" sx={{ width: '7rem', height: '7rem' }} />
          </Grid>
          <Grid item md={8}>
            <Typography variant="h2" sx={{ color: '#ffffff', mb: '0.75rem' }}>
              Best time to post
            </Typography>
            <Typography variant="h1" sx={{ color: '#ffffff' }}>
              3.54pm
            </Typography>
          </Grid>
        </Grid>
        <Grid item container md={12} alignItems="center">
          <Grid item>
            <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'normal' }}>
              This is based on when your followers are most active on instagram
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default TimePost;
