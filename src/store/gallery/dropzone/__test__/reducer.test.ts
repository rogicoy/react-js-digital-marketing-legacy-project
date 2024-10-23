/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import reducer from '../reducer';
import * as types from '../types';
import * as actions from '../actions';
import { DropzoneState, DropzoneFile, FileUploadResponse } from '../models';

describe('Dropzone reducer', () => {
  const initState: DropzoneState = {
    files: [
      {
        ref: 'abc',
        url: '/test1',
        name: 'file1',
        index: 0,
        width: 1500,
        height: 1500,
        uploadStatus: 'unuploaded'
      }
    ]
  };

  it('test gallery/dropzone/ADD_FILES', () => {
    const testFile: DropzoneFile = {
      ref: 'abc2',
      url: '/test2',
      name: 'file2',
      index: 1,
      width: 1500,
      height: 1500,
      uploadStatus: 'unuploaded'
    };
    const result = reducer(initState, actions.addFiles([testFile]));
    expect(result.files[1]).toEqual(testFile);
  });

  it('test gallery/dropzone/CLEAR_FILES', () => {
    const result = reducer(initState, actions.clearFiles());
    expect(result.files.length).toEqual(0);
  });

  it('test gallery/dropzone/UPLOAD_FILE_REQUEST with valid ref key', () => {
    const testResponse: FileUploadResponse = {
      ref: 'abc'
    };
    const mockAction = jest.fn().mockReturnValue({ type: types.UPLOAD_FILE_REQUEST, payload: testResponse });
    const result = reducer(initState, mockAction());
    expect(result.files[0].uploadStatus).toEqual('ongoing');
  });

  it('test gallery/dropzone/UPLOAD_FILE_REQUEST with invalid ref key', () => {
    const testResponse: FileUploadResponse = {
      ref: ''
    };
    const mockAction = jest.fn().mockReturnValue({ type: types.UPLOAD_FILE_REQUEST, payload: testResponse });
    const result = reducer(initState, mockAction());
    expect(result.files[0].uploadStatus).toEqual('unuploaded');
  });

  it('test gallery/dropzone/UPLOAD_FILE_SUCCESS with valid ref key', () => {
    const testResponse: FileUploadResponse = {
      ref: 'abc'
    };
    const mockAction = jest.fn().mockReturnValue({ type: types.UPLOAD_FILE_SUCCESS, payload: testResponse });
    const result = reducer(initState, mockAction());
    expect(result.files[0].uploadStatus).toEqual('success');
  });

  it('test gallery/dropzone/UPLOAD_FILE_FAILED with valid ref key', () => {
    const testResponse: FileUploadResponse = {
      ref: 'abc'
    };
    const mockAction = jest.fn().mockReturnValue({ type: types.UPLOAD_FILE_FAILED, payload: testResponse });
    const result = reducer(initState, mockAction());
    expect(result.files[0].uploadStatus).toEqual('failed');
  });

  it('test invalid Dropzone action', () => {
    const mockAction = jest.fn().mockReturnValue({ type: '', payload: '' });
    const result = reducer(initState, mockAction());
    expect(result).toEqual(initState);
  });
});
