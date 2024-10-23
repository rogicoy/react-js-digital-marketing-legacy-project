/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';
import config from 'config';
import { GuardProps } from 'types';
import { useEffect } from 'react';

// ==============================|| GUEST GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }: GuardProps) => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && user?.onboardingStep) {
      if (user.onboardingStep === 'DONE') navigate(config.defaultPath, { replace: true });
      if (user.onboardingStep !== 'DONE') navigate(config.onboardPath, { replace: true });
    }
  }, [isLoggedIn, navigate, user]);

  return children;
};

export default GuestGuard;
