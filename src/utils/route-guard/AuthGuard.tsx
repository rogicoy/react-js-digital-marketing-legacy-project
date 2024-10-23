/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { useNavigate } from 'react-router-dom';
import config from 'config';

// project imports
import useAuth from 'hooks/useAuth';
import { GuardProps } from 'types';
import { useEffect } from 'react';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }: GuardProps) => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }

    if (isLoggedIn && user?.onboardingStep) {
      if (user.onboardingStep !== 'DONE') navigate(config.onboardPath, { replace: true });
    }
  }, [isLoggedIn, user, navigate]);

  return children;
};

export default AuthGuard;
