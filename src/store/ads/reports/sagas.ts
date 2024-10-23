/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { SagaIterator } from '@redux-saga/core';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import * as actions from './actions';
import { enqueueErrorAlert } from 'store/common/alert-queue/actions';
import { CampaignReport } from './models';
import gql from './gql';

export function* callAdsReportsApi(action: ReturnType<typeof actions.callAdsReportsApi.request>): SagaIterator {
  const response = yield call(() => gql.api.getReports());
  const { facebookCampaignReports } = response.data;

  if (facebookCampaignReports !== undefined) {
    const result: CampaignReport[] = [];
    facebookCampaignReports.data.map((report: CampaignReport) =>
      result.push({
        ...report,
        type: 'Facebook Lead Generation'
      })
    );
    yield put(actions.callAdsReportsApi.success(result));
  } else {
    yield put(enqueueErrorAlert('ads', 'Failed to get your campaign reports.'));
  }
}

export default function* () {
  yield takeLatest(getType(actions.callAdsReportsApi.request), callAdsReportsApi);
}
