/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import { IRoute } from 'types';
import { Navigate } from 'react-router-dom';

const Dashboard = Loadable(lazy(() => import('views/dashboard')));
const Gallery = Loadable(lazy(() => import('views/gallery')));
const Scheduler = Loadable(lazy(() => import('views/scheduler')));
const Insights = Loadable(lazy(() => import('views/insights')));
const NewAd = Loadable(lazy(() => import('views/ads/new-ad')));
const FacebookAdBuilderModal = Loadable(lazy(() => import('views/ads/new-ad/facebook')));
const AdsCampaigns = Loadable(lazy(() => import('views/ads/campaigns')));
const AdsLeads = Loadable(lazy(() => import('views/ads/leads')));
const AdsReports = Loadable(lazy(() => import('views/ads/reports')));
const AdsReportDetails = Loadable(lazy(() => import('views/ads/reports/details')));
const Account = Loadable(lazy(() => import('views/account')));
const ConnectedAccounts = Loadable(lazy(() => import('views/account/socials')));
const Plans = Loadable(lazy(() => import('views/plans')));

const MainRoutes: IRoute = {
  path: '/',
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: '/',
      element: <Navigate to="/dashboard" />
    },
    {
      path: '/dashboard',
      element: <Dashboard />
    },
    {
      path: '/gallery',
      element: <Gallery />
    },
    {
      path: '/scheduler',
      element: <Scheduler />
    },
    {
      path: '/insights',
      element: <Insights />
    },
    {
      path: '/insights/:social/:tab',
      element: <Insights />
    },
    {
      path: '/ads/create',
      element: <NewAd />,
      children: [
        {
          path: '/ads/create/facebook',
          element: <FacebookAdBuilderModal />
        },
        {
          path: '/ads/create/facebook/:facebookCampaignId',
          element: <FacebookAdBuilderModal />
        }
      ]
    },
    {
      path: '/ads/campaigns',
      element: <AdsCampaigns />,
      children: [
        {
          path: '/ads/campaigns/:facebookCampaignId',
          element: <FacebookAdBuilderModal />
        }
      ]
    },
    {
      path: '/ads/leads',
      element: <AdsLeads />
    },
    {
      path: '/ads/reports',
      element: <AdsReports />
    },
    {
      path: '/ads/reports/:adInputId',
      element: <AdsReportDetails />
    },
    {
      path: '/support/faq',
      element: undefined
    },
    {
      path: '/support/tutorials',
      element: undefined
    },
    {
      path: '/support/contact',
      element: undefined
    },
    {
      path: '/account/connectaccounts',
      element: <ConnectedAccounts />
    },
    {
      path: '/account/:tab',
      element: <Account />
    },
    {
      path: '/plans',
      element: <Plans />
    }
  ]
};

export default MainRoutes;
