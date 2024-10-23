/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import { Grid, Skeleton } from '@material-ui/core';

const SimpleSkeletonCard: FC = () => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Skeleton variant="rectangular" animation="wave" />
    </Grid>
    <Grid item xs={12}>
      <Skeleton variant="rectangular" animation="wave" />
    </Grid>
    <Grid item xs={12}>
      <Skeleton variant="rectangular" animation="wave" />
    </Grid>
  </Grid>
);

export default SimpleSkeletonCard;
