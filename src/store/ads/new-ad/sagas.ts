/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { getType } from 'typesafe-actions';
import * as errorActions from '../../common/error/actions';
import * as errorTypes from '../../common/error/types';
import * as actions from './actions';
import gql from './gql';

export function* callNewAdApi(action: ReturnType<typeof actions.callNewAdApi.request>): SagaIterator {
  yield put(actions.callNewAdApi.failure({ source: errorTypes.ErrorSource.ads, code: '100' }));
  yield put(errorActions.logLocalError({ source: errorTypes.ErrorSource.ads, code: '100' }));
}

export function* callFacebookCampaignApi(action: ReturnType<typeof actions.callFacebookCampaignApi.request>): SagaIterator {
  const { status } = action.payload;
  try {
    const response = yield call(() => gql.api.createFacebookCampaign({ status }));
    const { info } = response.data.facebookCampaign;

    yield put(actions.callFacebookCampaignApi.success({ info }));
  } catch (err) {
  }
}

export default function* () {
  yield takeLatest(getType(actions.callNewAdApi.request), callNewAdApi);
  yield takeLatest(getType(actions.callFacebookCampaignApi.request), callFacebookCampaignApi);
}
