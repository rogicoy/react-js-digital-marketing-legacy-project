/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { combineReducers } from 'redux';
import mainReducer from './main/reducer';
import unsplashReducer from './unsplash/reducer';
import filterReducer from './filter/reducer';
import dropzoneReducer from './dropzone/reducer';

const galleryReducer = combineReducers({
  main: mainReducer,
  unsplash: unsplashReducer,
  filter: filterReducer,
  dropzone: dropzoneReducer
});

export default galleryReducer;
