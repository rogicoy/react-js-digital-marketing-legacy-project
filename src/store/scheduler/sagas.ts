/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { SagaIterator } from '@redux-saga/core';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { GetFbPostReponse, GetIgPostReponse, GetLiPostReponse, GetSchedPostsResponse, GetTwPostReponse } from './models';
import * as actions from './actions';
import { enqueueErrorAlert } from 'store/common/alert-queue/actions';
import gql from './gql';

export function* getSchedulerPosts(action: ReturnType<typeof actions.getSchedulerPosts.request>): SagaIterator {
  yield put(actions.getSchedulerPosts.success([]));
}

export function* getIgPosts(action: ReturnType<typeof actions.getIgPosts.request>): SagaIterator {
  try {
    const response: GetSchedPostsResponse[] = [];
    const resultIg = yield call(() => gql.api.getIgPosts(action.payload));
    const {
      instagramSchedulePost: { data: igPostData }
    }: {
      instagramSchedulePost: {
        data: GetIgPostReponse[];
      };
    } = resultIg.data;

    igPostData.forEach((item: GetIgPostReponse) => {
      const status = item.status === 'FAILED' || item.status === 'COMPLETED';

      response.push({
        id: item.id,
        title: '',
        description: item.caption,
        start: new Date(item.postAt),
        end: new Date(item.postAt),
        color: !status ? '#f9d6e2' : '#dddddd',
        textColor: !status ? '#e23670' : '#000000',
        image: item.imageUrl,
        comment: item.firstComment,
        locationTag: JSON.parse(item.locationTags),
        extendedProps: {
          platform: 'instagram',
          status: item.status,
          link: item.link,
          errorMessage: item.errorMessage,
          mediaType: item.mediaType,
          mediaFrame: item.mediaFrame
        },
        editable: !status
      });
    });

    yield put(actions.getIgPosts.success(response));
  } catch (err) {
    yield put(enqueueErrorAlert('sch', 'Failed Instagram posts'));
  }
}

export function* getFbgPosts(action: ReturnType<typeof actions.getFbPosts.request>): SagaIterator {
  try {
    const response: GetSchedPostsResponse[] = [];
    const resultFb = yield call(() => gql.api.getFbPosts(action.payload));
    const {
      facebookSchedulePost: { data: fBPostData }
    }: {
      facebookSchedulePost: {
        data: GetFbPostReponse[];
      };
    } = resultFb.data;

    fBPostData.forEach((item: GetFbPostReponse) => {
      const status = item.status === 'FAILED' || item.status === 'COMPLETED';

      response.push({
        id: item.id,
        title: '',
        description: item.caption,
        start: new Date(item.postAt),
        end: new Date(item.postAt),
        color: !status ? '#d0e0f2' : '#dddddd',
        textColor: !status ? '#1b69c1' : '#000000',
        image: item.imageUrl,
        comment: '',
        locationTag: JSON.parse(item.locationTags),
        extendedProps: {
          platform: 'facebook',
          status: item.status,
          link: item.link,
          errorMessage: item.errorMessage,
          mediaType: item.mediaType,
          mediaFrame: item.mediaFrame
        },
        editable: !status
      });
    });

    yield put(actions.getFbPosts.success(response));
  } catch (err) {
    yield put(enqueueErrorAlert('sch', 'Failed getting Facebook posts'));
  }
}

export function* getTwPosts(action: ReturnType<typeof actions.getTwPosts.request>): SagaIterator {
  try {
    const response: GetSchedPostsResponse[] = [];
    const resultTw = yield call(() => gql.api.getTwPosts(action.payload));
    const {
      twitterSchedulePost: { data: twPostData }
    }: {
      twitterSchedulePost: {
        data: GetTwPostReponse[];
      };
    } = resultTw.data;

    twPostData.forEach((item: GetTwPostReponse) => {
      const status = item.status === 'FAILED' || item.status === 'COMPLETED';

      response.push({
        id: item.id,
        title: '',
        description: item.caption,
        start: new Date(item.postAt),
        end: new Date(item.postAt),
        color: !status ? '#d2e7fa' : '#dddddd',
        textColor: !status ? '#218ae5' : '#000000',
        image: item.imageUrl,
        comment: '',
        locationTag: '',
        extendedProps: {
          platform: 'twitter',
          status: item.status,
          link: item.link,
          errorMessage: item.errorMessage,
          mediaType: item.mediaType,
          mediaFrame: item.mediaFrame
        },
        editable: !status
      });
    });

    yield put(actions.getFbPosts.success(response));
  } catch (err) {
    yield put(enqueueErrorAlert('sch', 'Failed getting Twitter posts'));
  }
}

export function* getLiPosts(action: ReturnType<typeof actions.getLiPosts.request>): SagaIterator {
  try {
    const response: GetSchedPostsResponse[] = [];
    const resultLi = yield call(() => gql.api.getLiPosts(action.payload));
    const {
      linkedinSchedulePost: { data: liPostData }
    }: {
      linkedinSchedulePost: {
        data: GetLiPostReponse[];
      };
    } = resultLi.data;

    liPostData.forEach((item: GetLiPostReponse) => {
      // for linkedin PUBLISHED AND FAILED
      const status = item.status === 'PUBLISHED' || item.status === 'FAILED';

      response.push({
        id: item.id,
        title: item.title,
        description: item.caption,
        start: new Date(item.postAt),
        end: new Date(item.postAt),
        color: !status ? '#2867b280' : '#dddddd',
        textColor: !status ? '#2867B2' : '#000000',
        image: item.imageUrl,
        comment: '',
        locationTag: '',
        extendedProps: {
          platform: 'linkedin',
          status: item.status,
          link: item.link,
          errorMessage: item.errorMessage,
          mediaType: item.mediaType,
          mediaFrame: item.mediaFrame
        },
        editable: !status
      });
    });

    yield put(actions.getFbPosts.success(response));
  } catch (err) {
    yield put(enqueueErrorAlert('sch', 'Failed getting LinkedIn posts'));
  }
}

export function* createSchedulerPost(action: ReturnType<typeof actions.createSchedulerPost.request>): SagaIterator {
  yield put(
    actions.createSchedulerPost.success({
      id: Date.now().toString(),
      ...action.payload
    })
  );
}

export default function* () {
  yield takeLatest(getType(actions.getSchedulerPosts.request), getSchedulerPosts);
  yield takeLatest(getType(actions.createSchedulerPost.request), createSchedulerPost);
  yield takeLatest(getType(actions.getIgPosts.request), getIgPosts);
  yield takeLatest(getType(actions.getFbPosts.request), getFbgPosts);
  yield takeLatest(getType(actions.getTwPosts.request), getTwPosts);
  yield takeLatest(getType(actions.getLiPosts.request), getLiPosts);
}
