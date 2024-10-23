/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import { Grid } from '@material-ui/core';

// components
import { gridSpacing } from 'views/common/constant';
import PageSummaryFacebook from './PageSummaryFacebook';
import LikesGrowthFacebook from './LikesGrowthFacebook';
import PerformingPostsFacebook from './PerformingPostsFacebook';
import AudienceCard from './audience/AudienceCard';
import { IDateRange } from 'ui-component/date-range-picker';

interface IOverviewFacebook {
  dateRange: IDateRange;
}

const OverviewFacebook: FC<IOverviewFacebook> = ({ dateRange }) => (
  <Grid container spacing={gridSpacing}>
    <Grid item xs={12}>
      <PageSummaryFacebook dateRange={dateRange} />
    </Grid>

    <Grid item xs={12}>
      <Grid container spacing={gridSpacing}>
        <Grid item md={8}>
          <LikesGrowthFacebook />
        </Grid>
        <Grid item md={4}>
          <AudienceCard
            mainTitle="Audience Insights"
            initialActiveItem="CITY"
            audienceChart={{
              title: 'Total Accounts Engaged',
              color: '#4285f4'
            }}
            filters={[]}
            dateRange={dateRange}
            // for UI purposes for now when API is ready
            disabled
          />
        </Grid>
      </Grid>
    </Grid>

    <Grid item xs={12}>
      <Grid item>
        <PerformingPostsFacebook mainTitle="Top performing posts" />
      </Grid>
    </Grid>
  </Grid>
);

export default OverviewFacebook;
