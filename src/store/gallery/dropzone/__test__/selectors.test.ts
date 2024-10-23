/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import * as selectors from '../selectors';
import { DropzoneState } from '../models';

describe('Dropzone selectors', () => {
  const state: DropzoneState = {
    files: [
      {
        ref: 'abc1',
        url: '/url1',
        name: 'file1',
        index: 0,
        width: 1500,
        height: 3500,
        uploadStatus: 'unuploaded'
      },
      {
        ref: 'abc2',
        url: '/url2',
        name: 'file2',
        index: 0,
        width: 3001,
        height: 2900,
        uploadStatus: 'unuploaded'
      },
      {
        ref: 'abc3',
        url: '/url3',
        name: 'file3',
        index: 0,
        width: 3010,
        height: 3010,
        uploadStatus: 'unuploaded'
      },
      {
        ref: 'abc4',
        url: '/url4',
        name: 'file4',
        index: 0,
        width: 3000,
        height: 3000,
        uploadStatus: 'success'
      },
      {
        ref: 'abc5',
        url: '/url5',
        name: 'file5',
        index: 0,
        width: 3000,
        height: 3000,
        uploadStatus: 'ongoing'
      }
    ]
  };

  it('test makeCollateViolationCount', () => {
    const result = selectors.makeCollateViolationCount()({ gallery: { dropzone: state } });
    expect(result.filesWithInvalidDimension).toEqual(1);
    expect(result.filesWithInvalidHeightOnly).toEqual(1);
    expect(result.filesWithInvalidWidthOnly).toEqual(1);
  });

  it('test makeGetValidFiles', () => {
    const result = selectors.makeGetValidFiles()({ gallery: { dropzone: state } });
    expect(result[0].ref).toEqual('abc4');
    expect(result[1].ref).toEqual('abc5');
  });

  it('test makeGetSuccessfulUploads', () => {
    const result = selectors.makeGetSuccessfulUploads()({ gallery: { dropzone: state } });
    expect(result[0].ref).toEqual('abc4');
  });

  it('test makeGetOngoingUploads', () => {
    const result = selectors.makeGetOngoingUploads()({ gallery: { dropzone: state } });
    expect(result[0].ref).toEqual('abc5');
  });
});
