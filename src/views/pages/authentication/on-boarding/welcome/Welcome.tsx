/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useState } from 'react';
import { gridSpacing } from 'views/common/constant';
import useAuth from 'hooks/useAuth';

// material ui
import { useTheme } from '@material-ui/core/styles';
import { Box, Button, Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';

// components
import AuthWrapper3 from '../../AuthWrapper3';
import AuthCardWrapper from '../../AuthCardWrapper';
import LogoWhite from 'ui-component/LogoWhite';
import LoaderCircle from 'ui-component/LoaderCircle';

const Welcome: FC = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { updateUserOnboard } = useAuth();

  const onSubmit = () => {
    setIsLoading(true);
    updateUserOnboard({ step: 'BUSINESS' });
  };

  return (
    <AuthWrapper3>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: '100vh', background: 'transparent linear-gradient(180deg, #A55CFF 0%, #7400FF 100%) 0% 0% no-repeat padding-box' }}
      >
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ my: 3, minHeight: 'calc(100vh - 68px)' }}>
            <AuthCardWrapper maxWidth="600px" sx={{ background: 'transparent', zIndex: 1 }}>
              <Grid container spacing={gridSpacing} alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <LogoWhite width="150px" />
                  </Box>
                </Grid>
                <Grid item xs={12} mt={5}>
                  <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                    <Grid item>
                      <Stack alignItems="center" justifyContent="center" spacing={5}>
                        <Typography color="#ffffff" component="h1" sx={{ fontWeight: '700', fontSize: '3.5rem' }}>
                          Ready for lift-off?
                        </Typography>
                        <Typography color="#ffffff" variant="h3" sx={{ textAlign: 'center', fontWeight: '500', lineHeight: 1.25 }}>
                          To give you the best experience possible, we need a few details to get you started!
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} mt={5}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" onClick={() => onSubmit()}>
                      Let’s start
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </AuthCardWrapper>

            {isLoading && (
              <Box>
                <LoaderCircle />
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper3>
  );
};

export default Welcome;
