/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { PaletteMode } from '@material-ui/core';

const config: {
  basename: string;
  defaultPath: string;
  onboardPath: string;
  fontFamily: string;
  borderRadius: number;
  outlinedFilled: boolean;
  theme: PaletteMode;
  presetColor: string;
  i18n: string;
  rtlLayout: boolean;
  jwt: {
    secret: string;
    timeout: string;
  };
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
  };
  auth0: {
    client_id: string;
    domain: string;
  };
  nodeEnv: string;
  environment: string;
  graphqlUrl: string;
  apiUrl: string;
  socketUrl: string;
  stripeKey: string;
} = {
  basename: '',
  defaultPath: '/dashboard',
  onboardPath: '/onboarding',
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
  outlinedFilled: true,
  theme: 'light', // light, dark
  presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
  // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
  i18n: 'en',
  rtlLayout: false,
  jwt: {
    secret: 'SECRET-KEY',
    timeout: '1 days'
  },
  firebase: {
    apiKey: 'removed',
    authDomain: 'removed',
    projectId: 'removed',
    storageBucket: 'removed',
    messagingSenderId: 'removed',
    appId: 'removed',
    measurementId: 'removed'
  },
  auth0: {
    client_id: 'removed',
    domain: 'removed'
  },
  nodeEnv: process.env.NODE_ENV,
  environment: process.env.REACT_APP_ENVIRONMENT,
  graphqlUrl: process.env.REACT_APP_GRAPHQL_URL,
  apiUrl: process.env.REACT_APP_API_URL,
  socketUrl: process.env.REACT_APP_SOCKET_URL,
  stripeKey: process.env.REACT_APP_STRIPE_KEY
};

export default config;
