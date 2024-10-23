/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { IStripePlans } from '../../interface';
import { PlanTypes } from '../../types';

// material ui
import { Grid } from '@material-ui/core';

// components
import AuthWrapper3 from '../../AuthWrapper3';
import AuthCardWrapper from '../../AuthCardWrapper';
import ChoosePlan from './ChoosePlan';
import Payment from './Payment';

export interface IPlanSteps {
  type: PlanTypes;
  setType: (x: PlanTypes) => void;
  setStep: (x: number) => void;
  setPlan: (x: IStripePlans) => void;
}

export interface IStripePayment {
  type: PlanTypes;
  plan: IStripePlans;
}

const PlanPayment: FC = () => {
  const [step, setStep] = useState<number>(1);
  const [plan, setPlan] = useState<IStripePlans | null>(null);
  const [type, setType] = useState<PlanTypes>('month');

  const handleDebounceType = useDebouncedCallback((value: PlanTypes) => {
    setType(value);
  }, 1000);

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
            <AuthCardWrapper maxWidth="1200px" sx={{ width: '1200px', zIndex: 1 }}>
              {step === 1 && <ChoosePlan setStep={setStep} setPlan={setPlan} type={type} setType={handleDebounceType} />}
              {step === 2 && plan !== null && <Payment plan={plan} type={type} />}
            </AuthCardWrapper>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper3>
  );
};

export default PlanPayment;
