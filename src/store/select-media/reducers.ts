/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { combineReducers } from 'redux';
import mainReducer from './main/reducer';
import dropzoneReducer from './dropzone/reducer';

const galleryReducer = combineReducers({
  main: mainReducer,
  dropzone: dropzoneReducer
});

export default galleryReducer;
