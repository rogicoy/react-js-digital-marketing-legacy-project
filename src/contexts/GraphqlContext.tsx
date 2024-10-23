/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { createContext, useCallback, useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { TOnboard } from '_mockApis/user-profile/types';

// reducer - state management
import { ACCOUNT_INITIALIZE, LOGIN, LOGOUT } from 'store/native/actions';
import accountReducer from 'store/native/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import { initialLoginContextProps } from 'types';
import apolloClient from 'utils/apolloClient';
import accountGql from 'store/native/account.gql';
import * as actions from 'store/account/profile/actions';

const initialState: initialLoginContextProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const setSession = (serviceToken?: string | null) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
  } else {
    localStorage.removeItem('serviceToken');
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const GraphqlContext = createContext({
  ...initialState,
  login: (e: string, p: string) => Promise.resolve(),
  logout: () => {},
  signup: (payload: any) => {},
  updateUserOnboard: ({ step, updateMe }: { step: TOnboard; updateMe?: boolean }) => {},
  getMe: () => {}
});

export const GraphqlProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);
  const reduxDispatch = useDispatch();
  const updateProfile = useCallback(
    (data) => {
      reduxDispatch(actions.updateProfile(data));
    },
    [reduxDispatch]
  );

  const login = async (email: string, password: string) => {
    const response = await accountGql.api.login(email, password);
    const user = response.data?.login;
    const serviceToken = response.data?.login?.info;
    setSession(serviceToken);
    dispatch({
      type: LOGIN,
      payload: {
        ...state,
        user
      }
    });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
    apolloClient.resetStore();
  };

  const signup = async (payload: any) => {
    const response = await accountGql.api.signup(payload);
    const newUser = response.data?.signup;
    return newUser;
  };

  const getMe = async () => {
    const response = await accountGql.api.me();
    const user = response.data?.me;
    updateProfile(user);
    dispatch({
      type: ACCOUNT_INITIALIZE,
      payload: {
        ...state,
        isLoggedIn: true,
        user
      }
    });
  };

  const updateUserOnboard = async ({ step, updateMe = false }: { step: TOnboard; updateMe?: boolean }) => {
    const response = await accountGql.api.updateUserOnboard(step);
    const updateOnboard = response.data?.updateProfile;

    if (updateMe) {
      await getMe();
    } else {
      const user = {
        ...state.user,
        onboardingStep: step
      };

      updateProfile(user);
      dispatch({
        type: ACCOUNT_INITIALIZE,
        payload: {
          ...state,
          isLoggedIn: true,
          user
        }
      });
    }

    return updateOnboard;
  };

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('serviceToken');
        if (serviceToken) {
          setSession(serviceToken);
          await getMe();
        } else {
          dispatch({
            type: ACCOUNT_INITIALIZE,
            payload: {
              ...state,
              isLoggedIn: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: ACCOUNT_INITIALIZE,
          payload: {
            ...state,
            isLoggedIn: false,
            user: null
          }
        });
      }
    };

    if (!state.user?.id) {
      init();
    }
  }, [state.user]);

  if (!state.isInitialized) return <Loader />;

  return (
    <GraphqlContext.Provider value={{ ...state, login, logout, signup, getMe, updateUserOnboard }}>{children}</GraphqlContext.Provider>
  );
};

export default GraphqlContext;
