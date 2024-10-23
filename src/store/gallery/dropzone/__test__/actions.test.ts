/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import * as actions from '../actions';
import * as types from '../types';
import { DropzoneFile } from '../models';

describe('Dropzone actions', () => {
  it('test makeAddFiles', () => {
    const testFile: DropzoneFile = {
      ref: 'abc',
      url: '/url',
      name: 'test',
      index: 1,
      width: 1000,
      height: 1000,
      uploadStatus: 'unuploaded'
    };
    const result = actions.makeAddFiles([testFile]);
    expect(result.type).toEqual(types.ADD_FILES);
    expect(result.payload[0]).toEqual(testFile);
  });

  it('test makeCallFileUploadApi', () => {
    const file = new File([], 'test');
    const result = actions.makeCallFileUploadApi({ ref: 'abc', file });
    expect(result.type).toEqual(types.UPLOAD_FILE_REQUEST);
  });

  it('test makeClearFiles', () => {
    const result = actions.makeClearFiles();
    expect(result.type).toEqual(types.CLEAR_FILES);
  });
});
