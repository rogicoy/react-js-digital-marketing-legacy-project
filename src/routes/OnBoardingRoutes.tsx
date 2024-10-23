/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// onboard
const OnBoarding = Loadable(lazy(() => import('views/pages/authentication/on-boarding')));

const OnBoardingRoutes = {
  path: 'onboarding',
  element: (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  ),
  children: [
    {
      index: true,
      element: <OnBoarding />
    }
  ]
};

export default OnBoardingRoutes;
