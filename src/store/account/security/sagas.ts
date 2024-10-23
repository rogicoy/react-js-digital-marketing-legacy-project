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

export function* callSecurityApi(action: ReturnType<typeof actions.callSecurityApi.request>): SagaIterator {
  yield put(actions.callSecurityApi.failure({ source: errorTypes.ErrorSource.accountSecurity, code: '100' }));
  yield put(errorActions.logLocalError({ source: errorTypes.ErrorSource.accountSecurity, code: '100' }));
}

export default function* () {
  yield takeLatest(getType(actions.callSecurityApi.request), callSecurityApi);
}
