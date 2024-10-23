/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// project imports
import config from 'config';

// action - state management
import * as actionTypes from './actions';
import { NotificationStateProps, DefaultRootStateProps } from 'types';

export const initialState: DefaultRootStateProps['notification'] = {
  list: [],
  newItem: null,
  removeId: ''
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const notificationReducer = (state = initialState, action: NotificationStateProps) => {
  switch (action.type) {
    case actionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        list: [...state.list, action.newItem]
      };

    case actionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        list: state.list.filter((e) => e.noticeId !== action.removeId)
      };

    case actionTypes.RESET_NOTIFICATION_LIST:
      return {
        ...state,
        list: action.list
      };

    default:
      return state;
  }
};

export default notificationReducer;
