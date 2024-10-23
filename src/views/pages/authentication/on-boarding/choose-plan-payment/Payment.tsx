/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { gridSpacing } from 'views/common/constant';
import { IStripePayment } from './PlanPayment';
import config from 'config';
import useAuth from 'hooks/useAuth';

// material ui
import { useTheme } from '@material-ui/core/styles';
import { Grid, Stack, Typography, Button, useMediaQuery, Box } from '@material-ui/core';
import FormPayment from './FormPayment';
import LoaderCircle from 'ui-component/LoaderCircle';

const stripePromise = loadStripe(config.stripeKey);

const Payment: FC<IStripePayment> = ({ plan, type }) => {
  const { updateUserOnboard } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const skip = async () => {
    setIsLoading(true);
    await updateUserOnboard({ step: 'READY' });
  };

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center" p={5}>
      <Grid item xs={12}>
        <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
          <Grid item>
            <Stack alignItems="center" justifyContent="center" spacing={2}>
              <Typography color="#000000" variant="h1">
                Payment
              </Typography>
              <Typography color="#757575" variant="body2">
                No lock-in contracts, so you can cancel anytime! <br /> *excludes Ads Management Fee of 10% per month.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={12} spacing={gridSpacing}>
        <Grid item md={12}>
          <Elements stripe={stripePromise}>
            <FormPayment plan={plan} type={type} />
          </Elements>
        </Grid>
      </Grid>

      <Grid item container xs={12} spacing={gridSpacing} mt={3}>
        <Grid item md={12}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="button" variant="text" onClick={() => skip()}>
              Skip for now
            </Button>
          </div>
        </Grid>
      </Grid>

      {isLoading && (
        <Box>
          <LoaderCircle />
        </Box>
      )}
    </Grid>
  );
};

export default Payment;
