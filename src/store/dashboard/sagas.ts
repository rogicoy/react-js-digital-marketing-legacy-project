/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { SagaIterator } from '@redux-saga/core';
import { put, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import * as actions from './actions';
import { enqueueErrorAlert, enqueueWarningAlert, enqueueSuccessAlert, enqueueInfoAlert } from 'store/common/alert-queue/actions';

export function* callDashboardApi(action: ReturnType<typeof actions.callDashboardApi.request>): SagaIterator {
  switch (action.payload.request) {
    case 'error':
      yield put(enqueueErrorAlert('das', 'dasApiCallError'));
      break;
    case 'warn':
      yield put(enqueueWarningAlert('das', 'dasApiCallWarning'));
      break;
    case 'success':
      yield put(enqueueSuccessAlert('das', 'dasApiCallSuccess'));
      break;
    default:
      yield put(enqueueInfoAlert('das', 'dasApiCallInfo'));
  }
}

export default function* () {
  yield takeLatest(getType(actions.callDashboardApi.request), callDashboardApi);
}
