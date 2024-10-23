/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { SagaIterator } from '@redux-saga/core';
import { put, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import * as errorActions from '../common/error/actions';
import * as errorTypes from '../common/error/types';
import * as actions from './actions';

export function* callInsightsApi(action: ReturnType<typeof actions.callInsightsApi.request>): SagaIterator {
  // yield put(actions.callInsightsApi.success({ data1: 'data1-1', data2: 'data2-1' }));
  yield put(actions.callInsightsApi.failure({ source: errorTypes.ErrorSource.insights, code: '100' }));
  yield put(errorActions.logLocalError({ source: errorTypes.ErrorSource.insights, code: '100' }));
}

export default function* () {
  yield takeLatest(getType(actions.callInsightsApi.request), callInsightsApi);
}
