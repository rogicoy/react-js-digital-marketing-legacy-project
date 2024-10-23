/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { useTheme, Theme } from '@material-ui/core/styles';
import { AppBar, CssBaseline, Toolbar, useMediaQuery } from '@material-ui/core';

// third-party
import clsx from 'clsx';

// project imports
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import Header from './Header';
import Sidebar from './Sidebar';
import makeMenuItems from 'menu-items';
import { drawerWidth } from 'views/common/constant';
import { ADD_NOTIFICATION, SET_MENU } from 'store/native/actions';
import { DefaultRootStateProps } from 'types';

import { io } from 'socket.io-client';

// assets
import { IconChevronRight } from '@tabler/icons';
import useAuth from 'hooks/useAuth';
import config from 'config';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    backgroundColor: theme.palette.background.default
  },
  appBarWidth: {
    transition: theme.transitions.create('width'),
    backgroundColor: theme.palette.background.default
  },
  content: {
    ...theme.typography.mainContent,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: -(drawerWidth - 20),
      width: `calc(100% - ${drawerWidth}px)`
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px',
      width: `calc(100% - ${drawerWidth}px)`,
      padding: '16px'
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
      width: `calc(100% - ${drawerWidth}px)`,
      padding: '16px',
      marginRight: '10px'
    }
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px'
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px'
    }
  }
}));

const MainLayout = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuth();

  // Handle left drawer
  const leftDrawerOpened = useSelector((state: DefaultRootStateProps) => state.customization.opened);
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };

  useEffect(() => {
    const serviceToken = window.localStorage.getItem('serviceToken');
    const socket = io(`${config.socketUrl}?token=${serviceToken}`);

    socket.on('connect', () => {
      console.log('@socket [connected]: ID', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('@socket [disconnected]');
    });

    // listen
    socket.on('notification', (data) => {
      dispatch({
        type: ADD_NOTIFICATION,
        newItem: data
      });

      // acknowledgement
      socket.emit('acknowledgement', { noticeId: data.noticeId });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    dispatch({ type: SET_MENU, opened: !matchDownMd });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);

  // this is for intercom logged in users only
  useEffect(() => {
    if (user && user?.intercom) {
      const scriptHash = document.createElement('script');
      const scriptIntercom = document.createElement('script');

      scriptHash.innerHTML = `
        window.intercomSettings = {
          app_id: 'st1t7xxe',
          name: '${user.firstName} ${user.lastName}',
          email: '${user.email}',
          user_hash: '${user.intercom}'
        };
      `;

      scriptIntercom.innerHTML = `
        (function () {
          var w = window;
          var ic = w.Intercom;
          if (typeof ic === 'function') {
            ic('reattach_activator');
            ic('update', w.intercomSettings);
          } else {
            var d = document;
            var i = function () {
              i.c(arguments);
            };
            i.q = [];
            i.c = function (args) {
              i.q.push(args);
            };
            w.Intercom = i;
            var l = function () {
              var s = d.createElement('script');
              s.type = 'text/javascript';
              s.async = true;
              s.src = 'https://removed';
              var x = d.getElementsByTagName('script')[0];
              x.parentNode.insertBefore(s, x);
            };
            if (document.readyState === 'complete') {
              l();
            } else if (w.attachEvent) {
              w.attachEvent('onload', l);
            } else {
              w.addEventListener('load', l, false);
            }
          }
        })();
      `;

      document.body.appendChild(scriptHash);
      document.body.appendChild(scriptIntercom);
    }
  }, [user]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        className={leftDrawerOpened ? classes.appBarWidth : classes.appBar}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

      {/* main content */}
      <main
        className={clsx([
          classes.content,
          {
            [classes.contentShift]: leftDrawerOpened
          }
        ])}
      >
        {/* breadcrumb */}
        <Breadcrumbs separator={IconChevronRight} navigation={makeMenuItems()} icon title rightAlign />
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
