/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from 'hooks/useAuth';
import config from 'config';

// pages
import PlanPayment from 'views/pages/authentication/on-boarding/choose-plan-payment';
import Welcome from 'views/pages/authentication/on-boarding/welcome';
import BusinessDetails from 'views/pages/authentication/on-boarding/business-details';
import ClosePersonal from 'views/pages/authentication/on-boarding/close-personal';
import ConnectSocials from 'views/pages/authentication/on-boarding/connect-socials';
import ContentManager from 'views/pages/authentication/on-boarding/content-manager';

const OnBoarding: FC = () => {
  const { user } = useAuth();
  const step = user?.onboardingStep || null;

  const navigate = useNavigate();

  useEffect(() => {
    if (step && step === 'DONE') navigate(config.defaultPath, { replace: true });
  }, [step]);

  return (
    <>
      {step === 'CHOOSE' && <PlanPayment />}
      {step === 'READY' && <Welcome />}
      {step === 'BUSINESS' && <BusinessDetails />}
      {step === 'CLOSE' && <ClosePersonal />}
      {step === 'CONNECT' && <ConnectSocials />}
      {step === 'CONTENT' && <ContentManager />}
    </>
  );
};

export default OnBoarding;
