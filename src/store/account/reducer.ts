/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { combineReducers } from 'redux';
import billingReducer from './billing/reducer';
import businessReducer from './business/reducer';
import socialsReducer from './socials/reducer';
import profileReducer from './profile/reducer';
import securityReducer from './security/reducer';
import notificationsReducer from './notifications/reducer';

const accountReducer = combineReducers({
  profile: profileReducer,
  business: businessReducer,
  socials: socialsReducer,
  billing: billingReducer,
  security: securityReducer,
  notifications: notificationsReducer
});

export default accountReducer;
