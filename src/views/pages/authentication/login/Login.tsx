/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { Link } from 'react-router-dom';

// material-ui
import { useTheme, Theme } from '@material-ui/core/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import Logo from 'ui-component/Logo';
import AuthCardWrapper from '../AuthCardWrapper';
import GqlLogin from './GqlLogin';
import AuthFooter from 'ui-component/cards/AuthFooter';
import LogoWhite from 'assets/images/removed';
import Triangles from 'assets/images/removed';

const useStyles = makeStyles<Theme>((theme) => ({
  logo: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    maxWidth: '240px',
    [theme.breakpoints.down('lg')]: {
      maxWidth: '160px'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: '160px',
      position: 'relative',
      top: '0',
      left: '0',
      margin: '0 auto 40px',
      paddingTop: '40px'
    }
  },
  loginWrapper: {
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      minHeight: '0'
    }
  },
  loginWrapper2: {
    minHeight: 'calc(100vh - 68px)',
    [theme.breakpoints.down('sm')]: {
      minHeight: '0'
    }
  },
  login: {
    marginTop: '100px',
    marginBottom: '100px',
    [theme.breakpoints.down('lg')]: {
      marginTop: '40px',
      marginBottom: '60px'
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '40px',
      marginBottom: '60px'
    }
  },
  footNote: {
    marginTop: '12px',
    fontSize: '16px',
    color: '#6F778E',
    [theme.breakpoints.down('lg')]: {
      marginTop: '8px',
      fontSize: '14px'
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '8px',
      fontSize: '14px'
    }
  }
}));

const Login = () => {
  const theme = useTheme();
  const classes = useStyles();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AuthWrapper1>
      <Box style={{ position: 'relative', background: `url(${Triangles}) center / 1500px no-repeat` }}>
        <Box className={classes.logo}>
          <img src={LogoWhite} style={{ width: '100%', height: 'auto', maxWidth: '240px' }} />
        </Box>
        <Grid container direction="column" justifyContent="center" className={classes.loginWrapper}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" alignItems="center" className={classes.loginWrapper2}>
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <AuthCardWrapper>
                  <Grid container justifyContent="center">
                    <Grid item xs={12}>
                      <Typography
                        color={theme.palette.secondary.main}
                        variant={matchDownSM ? 'h3' : 'h2'}
                        sx={{ marginBottom: '4px', fontSize: '35px' }}
                      >
                        Hi, Welcome Back
                      </Typography>
                      <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'left'}>
                        Enter your credentials to continue
                      </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.login}>
                      <GqlLogin />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item container direction="column" alignItems="center" xs={12}>
                        <Typography className={classes.footNote}>
                          Need to create an account?{' '}
                          <Link to="/register" style={{ color: '#8E31F3' }}>
                            Sign up
                          </Link>
                        </Typography>
                        <Typography className={classes.footNote}>
                          Looking for another way to login?{' '}
                          <a href="https://removed" style={{ color: '#8E31F3' }}>
                            Contact support
                          </a>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
            <AuthFooter />
          </Grid> */}
        </Grid>
      </Box>
    </AuthWrapper1>
  );
};

export default Login;
