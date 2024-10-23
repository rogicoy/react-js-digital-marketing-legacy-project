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
import { UnsplashApiResponse } from './models';
import gql from './gql';

export function* callUnsplashApi(action: ReturnType<typeof actions.callUnsplashApi.request>): SagaIterator {
  try {
    const response = yield call(() => gql.api.getImages(action.payload));
    const result: UnsplashApiResponse = { images: [] };
    const { data } = response.data.unsplash;

    data.map((image: any) =>
      result.images.push({
        id: image.id,
        description: image.description,
        urlRegular: image.urls.regular,
        urlRaw: image.urls.raw,
        status: 'unused',
        width: image.width,
        height: image.height
      })
    );

    yield put(actions.callUnsplashApi.success(result));
  } catch (err) {
    yield put(actions.clearUnsplashImages());
    yield put(enqueueErrorAlert('gal', 'Failed to get images from unsplash.'));
  }
}

export function* callUploadUnsplashApi(action: ReturnType<typeof actions.callUploadUnsplashApi.request>): SagaIterator {
  try {
    const response = yield call(() => gql.api.uploadImage(action.payload));
    yield put(
      actions.callUploadUnsplashApi.success({
        link: action.payload.link,
        payload: response
      })
    );
  } catch (err) {
    yield put(
      actions.callUploadUnsplashApi.failure({
        link: action.payload.link,
        payload: undefined
      })
    );
    yield put(enqueueErrorAlert('gal', 'Failed to upload the image to content manager.'));
  }
}

export default function* () {
  yield takeLatest(getType(actions.callUnsplashApi.request), callUnsplashApi);
  yield takeLatest(getType(actions.callUploadUnsplashApi.request), callUploadUnsplashApi);
}
