/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import * as actions from '../actions';
import * as types from '../types';

describe('AlertQueue actions', () => {
  it('test makeEnqueueSuccessAlert', () => {
    const result = actions.makeEnqueueSuccessAlert('com', 'message');
    expect(result.type).toEqual(types.ENQUEUE_SUCCESS_ALERT);
    expect(result.payload).toEqual({ section: 'com', message: 'message' });
  });

  it('test makeEnqueueErrorAlert', () => {
    const result = actions.makeEnqueueErrorAlert('com', 'message');
    expect(result.type).toEqual(types.ENQUEUE_ERROR_ALERT);
    expect(result.payload).toEqual({ section: 'com', message: 'message' });
  });

  it('test makeEnqueueWarningAlert', () => {
    const result = actions.makeEnqueueWarningAlert('com', 'message');
    expect(result.type).toEqual(types.ENQUEUE_WARNING_ALERT);
    expect(result.payload).toEqual({ section: 'com', message: 'message' });
  });

  it('test makeEnqueueInfoAlert', () => {
    const result = actions.makeEnqueueInfoAlert('com', 'message');
    expect(result.type).toEqual(types.ENQUEUE_INFO_ALERT);
    expect(result.payload).toEqual({ section: 'com', message: 'message' });
  });

  it('test makeDequeueAlert', () => {
    const result = actions.makeDequeueAlert();
    expect(result.type).toEqual(types.DEQUEUE_ALERT);
  });

  it('test makeDequeueAlert', () => {
    const result = actions.makeOpenAlert(true);
    expect(result.type).toEqual(types.OPEN_ALERT);
    expect(result.payload).toEqual(true);
  });
});
