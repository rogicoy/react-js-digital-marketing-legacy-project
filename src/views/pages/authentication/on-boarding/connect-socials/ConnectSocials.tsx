/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import { gridSpacing } from 'views/common/constant';

// material ui
import { Grid, Stack, Typography } from '@material-ui/core';

// components
import AuthWrapper3 from '../../AuthWrapper3';
import AuthCardWrapper from '../../AuthCardWrapper';
import FormConnectSocials from './FormConnectSocials';

const ConnectSocials: FC = () => (
  <AuthWrapper3>
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      sx={{ minHeight: '100vh', background: 'transparent linear-gradient(180deg, #A55CFF 0%, #7400FF 100%) 0% 0% no-repeat padding-box' }}
    >
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center" sx={{ my: 3, minHeight: 'calc(100vh - 68px)' }}>
          <AuthCardWrapper maxWidth="1200px" sx={{ zIndex: 1 }}>
            <Grid container spacing={gridSpacing} alignItems="center" justifyContent="center">
              <Grid item xs={12} md={12}>
                <Stack alignItems="center" justifyContent="center" spacing={2}>
                  <Typography color="#000000" variant="caption">
                    Step 3 of 4
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={12}>
                <Stack alignItems="center" justifyContent="center" spacing={2}>
                  <Typography color="#000000" variant="h1">
                    (3) Get connected
                  </Typography>
                  <Typography color="#757575" variant="body2" sx={{ textAlign: 'center' }}>
                    We’re almost there! Connect at least one of your social media accounts so we can get your started.
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormConnectSocials />
              </Grid>
            </Grid>
          </AuthCardWrapper>
        </Grid>
      </Grid>
    </Grid>
  </AuthWrapper3>
);

export default ConnectSocials;
