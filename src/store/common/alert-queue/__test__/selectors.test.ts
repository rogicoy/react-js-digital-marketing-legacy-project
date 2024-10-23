/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import * as selectors from '../selectors';

describe('AlertQueue selectors', () => {
  it('test isOpenAlert', () => {
    const result = selectors.isOpenAlert({
      alertQueue: {
        alerts: [],
        openAlert: false
      }
    });
    expect(result).toEqual(false);
  });

  it('test makeGetTopAlert with alerts', () => {
    const result = selectors.makeGetTopAlert()({
      alertQueue: {
        alerts: [
          {
            type: 'info',
            section: 'com',
            messageKey: 'comSampleInfo'
          },
          {
            type: 'success',
            section: 'com',
            messageKey: 'comSampleSuccess'
          }
        ],
        openAlert: false
      }
    });

    expect(result).toEqual({
      type: 'info',
      section: 'com',
      messageKey: 'comSampleInfo'
    });
  });

  it('test makeGetTopAlert without alerts', () => {
    const result = selectors.makeGetTopAlert()({
      alertQueue: {
        alerts: [],
        openAlert: false
      }
    });

    expect(result).not.toBeDefined();
  });
});
