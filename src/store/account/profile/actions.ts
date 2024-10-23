/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { KeyObject } from 'crypto';
import { createAction } from 'typesafe-actions';
import * as types from './types';

export const updateProfile = createAction(types.UPDATE_PROFILE, (data: KeyObject) => data)();

export const makeUpdateProfile = (data: KeyObject) => updateProfile(data);
