/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Native REMOVED reducers
import customizationReducer from './native/customizationReducer';
import snackbarReducer from './native/snackbarReducer';
import cartReducer from './native/cartReducer';

// Main reducers
import appErrorReducer from './common/error/reducer';
import dashboardReducer from './dashboard/reducer';
import galleryReducer from './gallery/reducer';
import schedulerReducer from './scheduler/reducer';
import insightsReducer from './insights/reducer';
import adsReducer from './ads/reducer';
import accountReducer from './account/reducer';
import alertQueueReducer from './common/alert-queue/reducer';
import notificationReducer from './native/notificationReducer';
import selectMediaReducer from './select-media/reducers';

const reducer = combineReducers({
  errors: appErrorReducer,
  dashboard: dashboardReducer,
  gallery: galleryReducer,
  scheduler: schedulerReducer,
  insights: insightsReducer,
  ads: adsReducer,
  account: accountReducer,
  customization: customizationReducer,
  snackbar: snackbarReducer,
  alertQueue: alertQueueReducer,
  notification: notificationReducer,
  selectMedia: selectMediaReducer,
  cart: persistReducer(
    {
      key: 'cart',
      storage,
      keyPrefix: 'removed-'
    },
    cartReducer
  )
});

export default reducer;
