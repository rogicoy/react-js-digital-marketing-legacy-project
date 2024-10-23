/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { combineReducers } from 'redux';
import newAdReducer from './new-ad/reducer';
import adsCampaignsReducer from './campaigns/reducer';
import adsReportsReducer from './reports/reducer';
import AdsLeadsReducer from './leads/reducer';

const adsReducer = combineReducers({
  newAd: newAdReducer,
  campaigns: adsCampaignsReducer,
  leads: AdsLeadsReducer,
  reports: adsReportsReducer
});

export default adsReducer;
