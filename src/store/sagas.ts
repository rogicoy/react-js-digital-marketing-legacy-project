/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { all } from 'redux-saga/effects';
import dashboardSagas from './dashboard/sagas';
import gallerySagas from './gallery/main/sagas';
import galleryUnsplashSagas from './gallery/unsplash/sagas';
import galleryDrapzoneSagas from './gallery/dropzone/sagas';
import schedulerSagas from './scheduler/sagas';
import insightsSagas from './insights/sagas';
import adsNewSagas from './ads/new-ad/sagas';
import adsCampaignsSagas from './ads/campaigns/sagas';
import adsLeadsSagas from './ads/leads/sagas';
import adsReportsSagas from './ads/reports/sagas';
import accountBusiness from './account/business/sagas';
import accountSocials from './account/socials/sagas';
import accountBilling from './account/billing/sagas';
import accountSecurity from './account/security/sagas';
import accountNotifications from './account/notifications/sagas';
import selectMediaSagas from './select-media/main/sagas';
import selectMediaDropzoneSagas from './select-media/dropzone/sagas';

export default function* () {
  yield all([
    dashboardSagas(),
    gallerySagas(),
    galleryUnsplashSagas(),
    galleryDrapzoneSagas(),
    schedulerSagas(),
    insightsSagas(),
    adsNewSagas(),
    adsCampaignsSagas(),
    adsLeadsSagas(),
    adsReportsSagas(),
    accountBusiness(),
    accountSocials(),
    accountBilling(),
    accountSecurity(),
    accountNotifications(),
    selectMediaSagas(),
    selectMediaDropzoneSagas()
  ]);
}
