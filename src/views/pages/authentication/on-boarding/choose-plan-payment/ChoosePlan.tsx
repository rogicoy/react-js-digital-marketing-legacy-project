/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import { gridSpacing } from 'views/common/constant';
import { IPlanSteps } from './PlanPayment';

// material ui
import { useTheme } from '@material-ui/core/styles';
import { Grid, Stack, Typography, Switch, useMediaQuery } from '@material-ui/core';

// components
import FormChoosePlan from './FormChoosePlan';

const ChoosePlan: FC<IPlanSteps> = ({ type, setType, setStep, setPlan }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center" p={5}>
      <Grid item xs={12}>
        <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
          <Grid item>
            <Stack alignItems="center" justifyContent="center" spacing={2}>
              <Typography color="#000000" variant="h1">
                Simple pricing For everyone
              </Typography>
              <Typography color="#768CA1" variant="body2">
                No lock-in contracts so you can cancel anytime
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
              <Typography variant="subtitle1" sx={{ color: '#8E31F3', fontStyle: 'italic', mr: 3 }}>
                25% Discount On annual payment
              </Typography>
              <Typography variant="subtitle1">Monthly</Typography>
              <Switch onChange={(e) => setType(e.target.checked ? 'year' : 'month')} size="medium" />
              <Typography variant="subtitle1">Yearly</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={12} spacing={gridSpacing}>
        <Grid item md={12}>
          <FormChoosePlan type={type} setType={setType} setStep={setStep} setPlan={setPlan} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChoosePlan;
