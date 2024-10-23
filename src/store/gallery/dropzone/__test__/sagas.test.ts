/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { runSaga } from 'redux-saga';
import { callFileUploadApi } from 'store/gallery/dropzone/sagas';
import * as types from 'store/gallery/dropzone/types';
import * as alertTypes from 'store/common/alert-queue/types';
import gql from '../gql';

describe('Dropzone sagas', () => {
  it('test callFileUploadApi success', async () => {
    const dummyResponse = {
      data: {
        mediaUploader: {
          status: 'OK',
          message: '',
          payload: {
            id: 'abc',
            link: '/test',
            name: 'test',
            type: 'IMAGE'
          }
        }
      }
    };
    const uploadFile = jest.spyOn(gql.api, 'uploadFile').mockImplementation(() => Promise.resolve(dummyResponse));
    const dispatched: any[] = [];
    await runSaga({ dispatch: (action) => dispatched.push(action) }, callFileUploadApi, {
      type: types.UPLOAD_FILE_REQUEST,
      payload: {
        ref: 'abc',
        file: new File([], 'test')
      }
    });

    expect(uploadFile).toHaveBeenCalledTimes(1);
    expect(dispatched[0].type).toEqual(types.UPLOAD_FILE_SUCCESS);
    uploadFile.mockClear();
  });

  it('test callFileUploadApi error', async () => {
    const uploadFile = jest.spyOn(gql.api, 'uploadFile').mockImplementation(() => Promise.reject());
    const dispatched: any[] = [];
    await runSaga({ dispatch: (action) => dispatched.push(action) }, callFileUploadApi, {
      type: types.UPLOAD_FILE_REQUEST,
      payload: {
        ref: 'abc',
        file: new File([], 'test')
      }
    });

    expect(uploadFile).toHaveBeenCalledTimes(1);
    expect(dispatched[0].type).toEqual(types.UPLOAD_FILE_FAILED);
    expect(dispatched[1].type).toEqual(alertTypes.ENQUEUE_ERROR_ALERT);
    uploadFile.mockClear();
  });
});
