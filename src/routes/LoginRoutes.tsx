/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { lazy } from 'react';

// project imports
import GuestGuard from 'utils/route-guard/GuestGuard';
import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';
import Loadable from 'ui-component/Loadable';

// login routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/login')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: 'login',
  element: <MinimalLayout />,
  children: [
    {
      // path: '',
      index: true,
      element: (
        <NavMotion>
          <GuestGuard>
            <AuthLogin />
          </GuestGuard>
        </NavMotion>
      )
    }
  ]
};

export default LoginRoutes;
