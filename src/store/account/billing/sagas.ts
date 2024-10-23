/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { SagaIterator } from '@redux-saga/core';
import { put, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import * as errorActions from '../../common/error/actions';
import * as errorTypes from '../../common/error/types';
import * as actions from './actions';

export function* callBillingApi(action: ReturnType<typeof actions.callBillingApi.request>): SagaIterator {
  // yield put(actions.callBillingApi.success({ data1: 'data1-1', data2: 'data2-1' }));
  yield put(actions.callBillingApi.failure({ source: errorTypes.ErrorSource.accountBilling, code: '100' }));
  yield put(errorActions.logLocalError({ source: errorTypes.ErrorSource.accountBilling, code: '100' }));
}

export default function* () {
  yield takeLatest(getType(actions.callBillingApi.request), callBillingApi);
}
