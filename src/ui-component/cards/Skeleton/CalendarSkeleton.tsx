/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import { gridSpacing } from 'views/common/constant';

import { Grid, Skeleton } from '@material-ui/core';

const CalendarSkeleton: FC = () => (
  <Grid id="OrganicInsightsGrid" container spacing={gridSpacing}>
    <Grid container item spacing={2}>
      <Grid item xs={12}>
        <Skeleton variant="rectangular" animation="wave" sx={{ height: '195px' }} />
      </Grid>
    </Grid>
    <Grid container item spacing={gridSpacing}>
      <Grid item xs={12}>
        <Skeleton variant="rectangular" animation="wave" sx={{ height: '400px' }} />
      </Grid>
    </Grid>
  </Grid>
);

export default CalendarSkeleton;
