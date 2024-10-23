/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { SagaIterator } from '@redux-saga/core';
import { call, put, takeEvery, takeLatest, takeLeading } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { SelectMediasApiResponse } from './models';
import * as actions from './actions';
import { enqueueErrorAlert, enqueueSuccessAlert } from 'store/common/alert-queue/actions';
import gql from './gql';

export function* callSelectMediasApi(action: ReturnType<typeof actions.callSelectMediasApi.request>): SagaIterator {
  try {
    const response = yield call(() => gql.api.getSelectMedias(action.payload));
    const { currentPage, data, pages, perPage, totalCount } = response.data.mediaList;
    const result: SelectMediasApiResponse = {
      currentPage,
      medias: [],
      pages,
      perPage,
      totalCount
    };

    data.forEach((item: any) => {
      result.medias.push({
        id: item.id,
        name: item.name,
        link: item.link,
        description: '',
        media: item.media,
        mediaFrame: item.mediaFrame,
        tags: item.tags,
        type: item.type,
        status: item.status.toLowerCase(),
        source: item.source?.toLowerCase(),
        size: item.size,
        selected: false
      });
    });
    yield put(actions.callSelectMediasApi.success(result));
  } catch (err) {
    yield put(enqueueErrorAlert('gal', 'Failed to get your medias.'));
  }
}

export default function* () {
  yield takeLatest(getType(actions.callSelectMediasApi.request), callSelectMediasApi);
}
