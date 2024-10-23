/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';
import { Grid } from '@material-ui/core';

// project imports
import { gridSpacing } from 'views/common/constant';
import CampaignsTable from './CampaignsTable';
import { CampaignsTableProps } from '../types';

const Campaigns = (props: CampaignsTableProps) => {
  const { reports } = props;
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item md={12}>
        <CampaignsTable reports={reports} />
      </Grid>
    </Grid>
  );
};

export default Campaigns;
