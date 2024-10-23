/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import reducer from '../reducer';
import * as actions from '../actions';
import { AlertQueueState } from '../models';

describe('AlertQueue reducer', () => {
  const initState: AlertQueueState = {
    alerts: [],
    openAlert: false
  };

  it('test alertQueue/ENQUEUE_SUCCESS_ALERT', () => {
    const resultState = reducer(initState, actions.enqueueSuccessAlert('com', 'message'));
    expect(resultState.alerts.length).toEqual(1);
    expect(resultState.alerts[0]).toEqual({
      type: 'success',
      section: 'com',
      message: 'message'
    });
  });

  it('test alertQueue/ENQUEUE_ERROR_ALERT', () => {
    const resultState = reducer(initState, actions.enqueueErrorAlert('com', 'message'));
    expect(resultState.alerts.length).toEqual(1);
    expect(resultState.alerts[0]).toEqual({
      type: 'error',
      section: 'com',
      message: 'message'
    });
  });

  it('test alertQueue/ENQUEUE_WARNING_ALERT', () => {
    const resultState = reducer(initState, actions.enqueueWarningAlert('com', 'message'));
    expect(resultState.alerts.length).toEqual(1);
    expect(resultState.alerts[0]).toEqual({
      type: 'warning',
      section: 'com',
      message: 'message'
    });
  });

  it('test alertQueue/ENQUEUE_INFO_ALERT', () => {
    const resultState = reducer(initState, actions.enqueueInfoAlert('com', 'message'));
    expect(resultState.alerts.length).toEqual(1);
    expect(resultState.alerts[0]).toEqual({
      type: 'info',
      section: 'com',
      message: 'message'
    });
  });

  it('test alertQueue/DEQUEUE_ALERT', () => {
    const testState: AlertQueueState = {
      alerts: [
        {
          type: 'info',
          section: 'com',
          message: 'message1'
        },
        {
          type: 'success',
          section: 'com',
          message: 'message2'
        }
      ],
      openAlert: false
    };
    const resultState = reducer(testState, actions.dequeueAlert());
    expect(resultState.alerts.length).toEqual(1);
    expect(resultState.alerts[0]).toEqual({
      type: 'success',
      section: 'com',
      message: 'message2'
    });
  });

  it('test alertQueue/OPEN_ALERT', () => {
    const resultState = reducer(initState, actions.openAlert(true));
    expect(resultState.openAlert).toEqual(true);
  });

  it('test invalid AlertQueue action', () => {
    const mockAction = jest.fn().mockReturnValue({ type: '', payload: '' });
    const resultState = reducer(initState, mockAction());
    expect(resultState).toEqual(initState);
  });
});
