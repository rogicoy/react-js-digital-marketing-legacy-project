/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// action - state management
import { ACCOUNT_INITIALIZE, ACCOUNT_ONBOARD, LOGIN, LOGOUT } from './actions';
import { initialLoginContextProps } from 'types';

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState: initialLoginContextProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

export interface AccountReducerActionProps {
  type: string;
  payload?: initialLoginContextProps;
}

const accountReducer = (state = initialState, action: AccountReducerActionProps) => {
  switch (action.type) {
    case ACCOUNT_INITIALIZE: {
      const { isLoggedIn, user } = action.payload!;
      return {
        ...state,
        isLoggedIn,
        isInitialized: true,
        user
      };
    }
    case ACCOUNT_ONBOARD: {
      const { isLoggedIn, user } = action.payload!;
      return {
        ...state,
        isLoggedIn,
        isInitialized: true,
        user: {
          ...user
        }
      };
    }
    case LOGIN: {
      const { user } = action.payload!;
      return {
        ...state,
        isLoggedIn: true,
        user
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default accountReducer;
