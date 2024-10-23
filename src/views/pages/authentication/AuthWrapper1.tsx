/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui
import { styled } from '@material-ui/core/styles';

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : '#8E31F3',
  minHeight: '100vh'
}));

export default AuthWrapper1;
