/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const AuthForgotPassword = Loadable(lazy(() => import('views/pages/authentication/forgot-password')));
const AuthResetPassword = Loadable(lazy(() => import('views/pages/authentication/reset-password')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/register')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/register',
      element: <AuthRegister />
    },
    {
      path: '/forgot-password',
      element: <AuthForgotPassword />
    },
    {
      path: '/reset-password',
      element: <AuthResetPassword />
    }
  ]
};

export default AuthenticationRoutes;
