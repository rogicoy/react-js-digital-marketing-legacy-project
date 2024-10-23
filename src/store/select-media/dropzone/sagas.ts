/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { SagaIterator } from '@redux-saga/core';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import * as actions from './actions';
import gql from './gql';
import { enqueueErrorAlert, enqueueSuccessAlert } from 'store/common/alert-queue/actions';

export function* callFileUploadApi(action: ReturnType<typeof actions.callFileUploadApi.request>): SagaIterator {
  const { ref, file } = action.payload;
  try {
    const { status, error_message } = yield call(() => gql.api.uploadFile(ref, file));

    if (status !== 200) {
      throw new Error(error_message);
    }

    yield put(actions.callFileUploadApi.success({ ref }));
    yield put(enqueueSuccessAlert('gal', `Successfully uploaded file`));
  } catch (err) {
    yield put(actions.callFileUploadApi.failure({ ref }));
    yield put(enqueueErrorAlert('gal', 'Failed to upload your file.'));
  }
}

export default function* () {
  yield takeEvery(getType(actions.callFileUploadApi.request), callFileUploadApi);
}
