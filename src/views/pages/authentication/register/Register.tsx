/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';

// components
import AuthWrapper3 from '../AuthWrapper3';
import AuthCardWrapper from '../AuthCardWrapper';
import FormRegister from './FormRegister';

const Register: FC = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AuthWrapper3 isOnboarding>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #9B65F7 0%, #5F06FB 100%)' }}
      >
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ my: 3, minHeight: 'calc(100vh - 68px)' }}>
            <AuthCardWrapper>
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                  <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                    <Grid item>
                      <Stack alignItems="center" justifyContent="center" spacing={2}>
                        <Typography color="#000000" variant={matchDownSM ? 'h3' : 'h1'}>
                          Register Account
                        </Typography>
                        <Typography color="#757575" variant="body2">
                          Set your sights for success! Let REMOVED take the heavy lifting out of your digital marketing strategy by
                          registering your account today.
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <FormRegister />
                </Grid>
              </Grid>
            </AuthCardWrapper>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper3>
  );
};

export default Register;
