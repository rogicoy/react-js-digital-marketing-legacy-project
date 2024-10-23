/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { SagaIterator } from '@redux-saga/core';
import { call, put, takeEvery, takeLatest, takeLeading } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { GalleryMediasApiResponse } from './models';
import * as actions from './actions';
import { enqueueErrorAlert, enqueueSuccessAlert } from 'store/common/alert-queue/actions';
import gql from './gql';

export function* callGalleryMediasApi(action: ReturnType<typeof actions.callGalleryMediasApi.request>): SagaIterator {
  try {
    const response = yield call(() => gql.api.getMedias(action.payload));
    const { currentPage, data, pages, perPage, totalCount } = response.data.mediaList;
    const result: GalleryMediasApiResponse = {
      currentPage,
      medias: [],
      pages,
      perPage,
      totalCount
    };

    data.forEach((item: any, index: number) => {
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
        selected: false,
        caption: item.caption
      });
    });
    yield put(actions.callGalleryMediasApi.success(result));
  } catch (err) {
    yield put(enqueueErrorAlert('gal', 'Failed to get your medias.'));
  }
}

export function* callGalleryDeleteMediasApi(action: ReturnType<typeof actions.callGalleryDeleteMediasApi.request>): SagaIterator {
  try {
    const response = yield call(() => gql.api.deleteMedias(action.payload));
    if (response.data.mediaDelete.status === 200) {
      yield put(actions.callGalleryDeleteMediasApi.success(action.payload));
      yield put(enqueueSuccessAlert('gal', 'Your media is deleted'));
    } else {
      yield put(actions.callGalleryDeleteMediasApi.failure(action.payload));
      yield put(enqueueErrorAlert('gal', response.data.mediaDelete.error_message));
    }
  } catch (err: any) {
    yield put(actions.callGalleryDeleteMediasApi.failure(action.payload));
    yield put(enqueueErrorAlert('gal', 'Failed to delete your media'));
  }
}

export function* callAccountTagsApi(): SagaIterator {
  try {
    const response = yield call(() => gql.api.getAccountTags());
    const tags = response.data.mediaTagList.map((t: any) => ({ id: t.id, label: t.tag }));
    yield put(actions.callAccountTagsApi.success(tags));
  } catch (err) {
    yield put(enqueueErrorAlert('gal', 'Failed to get your tags'));
  }
}

export function* callAddAccountTagApi(action: ReturnType<typeof actions.callAddAccountTagApi.request>): SagaIterator {
  try {
    const { tag } = action.payload;
    const response = yield call(() => gql.api.addAccountTag(tag));
    const { error_message, status } = response.data.mediaAddTag;
    if (status === 200) {
      yield put(actions.callAddAccountTagApi.success(action.payload));
    } else {
      yield put(actions.callAddAccountTagApi.failure(action.payload));
      yield put(enqueueErrorAlert('gal', `Failed to add the tag: ${error_message}`));
    }
  } catch (err) {
    yield put(actions.callAddAccountTagApi.failure(action.payload));
    yield put(enqueueErrorAlert('gal', 'Failed to add the tag'));
  }
}

export function* callDeleteAccountTagApi(action: ReturnType<typeof actions.callDeleteAccountTagApi.request>): SagaIterator {
  try {
    const { id } = action.payload;
    const response = yield call(() => gql.api.deleteAccountTag(id));
    const { error_message, status } = response.data.mediaDeleteTag;
    if (status === 200) {
      yield put(actions.callDeleteAccountTagApi.success(action.payload));
    } else {
      yield put(actions.callDeleteAccountTagApi.failure(action.payload));
      yield put(enqueueErrorAlert('gal', `Failed to delete the tag: ${error_message}`));
    }
  } catch (err) {
    yield put(actions.callDeleteAccountTagApi.failure(action.payload));
    yield put(enqueueErrorAlert('gal', 'Failed to add the tag'));
  }
}

export function* callAddMediaTagApi(action: ReturnType<typeof actions.callAddMediaTagApi.request>): SagaIterator {
  try {
    const { mediaId, tag } = action.payload;
    const response = yield call(() => gql.api.addMediaTag([mediaId], [tag]));
    const { error_message, status } = response.data.mediaTagMedia;
    if (status === 200) {
      yield put(actions.callAddMediaTagApi.success(action.payload));
      yield put(actions.refreshMediaTags({ mediaId, nextTags: [tag] }));
    } else {
      yield put(actions.callAddMediaTagApi.failure(action.payload));
      yield put(enqueueErrorAlert('gal', `Failed to tag your media: ${error_message}`));
    }
  } catch (err) {
    yield put(actions.callAddMediaTagApi.failure(action.payload));
    yield put(enqueueErrorAlert('gal', 'Failed to tag your media'));
  }
}

export function* callDeleteMediaTagApi(action: ReturnType<typeof actions.callDeleteMediaTagApi.request>): SagaIterator {
  try {
    const { mediaId, tag } = action.payload;
    const response = yield call(() => gql.api.deleteMediaTag([mediaId], [tag]));
    const { error_message, status } = response.data.mediaUntagMedia;
    if (status === 200) {
      yield put(actions.callDeleteMediaTagApi.success(action.payload));
      yield put(actions.refreshMediaTags({ mediaId, nextTags: [tag] }));
    } else {
      yield put(actions.callDeleteMediaTagApi.failure(action.payload));
      yield put(enqueueErrorAlert('gal', `Failed to untag your media ${error_message}`));
    }
  } catch (err) {
    yield put(actions.callDeleteMediaTagApi.failure(action.payload));
    yield put(enqueueErrorAlert('gal', 'Failed to untag your media'));
  }
}

export default function* () {
  yield takeLatest(getType(actions.callGalleryMediasApi.request), callGalleryMediasApi);
  yield takeLeading(getType(actions.callGalleryDeleteMediasApi.request), callGalleryDeleteMediasApi);
  yield takeLatest(getType(actions.callAccountTagsApi.request), callAccountTagsApi);
  yield takeLeading(getType(actions.callAddAccountTagApi.request), callAddAccountTagApi);
  yield takeLeading(getType(actions.callDeleteAccountTagApi.request), callDeleteAccountTagApi);
  yield takeEvery(getType(actions.callAddMediaTagApi.request), callAddMediaTagApi);
  yield takeEvery(getType(actions.callDeleteMediaTagApi.request), callDeleteMediaTagApi);
}
