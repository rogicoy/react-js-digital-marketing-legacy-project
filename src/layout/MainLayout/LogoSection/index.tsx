/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@material-ui/core';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';
import LogoBeta from 'ui-component/LogoBeta';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
  <ButtonBase disableRipple component={Link} to={config.defaultPath}>
    {config.environment === 'staging' ? <LogoBeta /> : <Logo />}
  </ButtonBase>
);

export default LogoSection;
