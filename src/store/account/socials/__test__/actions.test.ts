/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import * as actions from '../actions';
import * as types from '../types';

describe('Test Socials actions', () => {
  it('Sample action', () => {
    const result = actions.makeCallSocialsApi({ data1: 'hello', data2: 'removed' });
    expect(result.type).toEqual(types.GET_SOCIALS_API_REQUEST);
    expect(result.payload.data1).toEqual('hello');
    expect(result.payload.data2).toEqual('removed');
  });
});
