/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';
import { Grid } from '@material-ui/core';
import { IDateRange } from 'ui-component/date-range-picker';

// project imports
import { gridSpacing } from 'views/common/constant';
import PostsTable from './PostsTable';
import MainCard from 'ui-component/cards/MainCard';

interface IPosts {
  dateRange?: IDateRange;
}

const Posts = ({ dateRange }: IPosts) => (
  <MainCard>
    <Grid container spacing={gridSpacing}>
      <Grid item md={12}>
        <PostsTable dateRange={dateRange} />
      </Grid>
    </Grid>
  </MainCard>
);

export default Posts;
