/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { useTheme, Theme } from '@material-ui/core/styles';
import {
  Avatar,
  CardContent,
  Chip,
  ClickAwayListener,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography
} from '@material-ui/core';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import useAuth from 'hooks/useAuth';
import { DefaultRootStateProps } from 'types';

// assets
import { IconBusinessplan, IconCreditCard, IconKey, IconLogout, IconSettings, IconUser } from '@tabler/icons';

// style const
const useStyles = makeStyles((theme: Theme) => ({
  navContainer: {
    width: '100%',
    maxWidth: '350px',
    minWidth: '300px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%'
    }
  },
  headerAvatar: {
    cursor: 'pointer',
    ...theme.typography.mediumAvatar,
    margin: '8px 0 8px 8px !important'
  },
  profileChip: {
    height: '48px',
    alignItems: 'center',
    borderRadius: '27px',
    transition: 'all .2s ease-in-out',
    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
    '&[aria-controls="menu-list-grow"], &:hover': {
      borderColor: theme.palette.primary.main,
      background: `${theme.palette.primary.main}!important`,
      color: theme.palette.primary.light,
      '& svg': {
        stroke: theme.palette.primary.light
      }
    }
  },
  profileLabel: {
    lineHeight: 0,
    padding: '12px'
  },
  listItem: {
    marginTop: '5px'
  },
  cardContent: {
    padding: '16px !important'
  },
  card: {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.primary.light,
    marginBottom: '16px',
    marginTop: '16px'
  },
  searchControl: {
    width: '100%',
    paddingRight: '8px',
    paddingLeft: '16px',
    marginBottom: '16px',
    marginTop: '16px'
  },
  startAdornment: {
    fontSize: '1rem',
    color: theme.palette.grey[500]
  },
  flex: {
    display: 'flex'
  },
  greeting: {
    fontWeight: 'normal'
  },
  name: {
    marginLeft: '2px'
  },
  ScrollHeight: {
    height: '100%',
    maxHeight: 'calc(100vh - 250px)',
    overflowX: 'hidden'
  },
  badgeWarning: {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.warning.dark,
    color: '#fff'
  }
}));

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme();
  const customization = useSelector((state: DefaultRootStateProps) => state.customization);

  const [selectedIndex] = React.useState(1);
  const { user, logout } = useAuth();
  const [open, setOpen] = React.useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = React.useRef<any>(null);
  const handleLogout = async () => {
    try {
      await logout();
      window.location.pathname = '/login';
    } catch (err) {
      console.error(err);
    }
  };
  const handleNavigate = (to: string) => {
    navigate(to);
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event: React.MouseEvent<HTMLDivElement> | MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        classes={{ label: classes.profileLabel }}
        className={classes.profileChip}
        icon={
          <Avatar
            src={user?.avatar}
            className={classes.headerAvatar}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <CardContent className={classes.cardContent}>
                    <Grid container direction="column" spacing={0}>
                      <Grid item className={classes.flex}>
                        <Typography variant="h4" className={classes.greeting}>
                          Hi,
                        </Typography>
                        <Typography component="span" variant="h4" className={classes.name}>
                          {user?.firstName}
                        </Typography>
                      </Grid>
                    </Grid>
                    <List component="nav" className={classes.navContainer}>
                      <ListItemButton
                        className={classes.listItem}
                        sx={{ borderRadius: `${customization.borderRadius}px` }}
                        selected={selectedIndex === 4}
                        onClick={() => handleNavigate('/account/profile')}
                      >
                        <ListItemIcon>
                          <IconUser stroke={1.5} size="1.3rem" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body2">Profile Settings</Typography>} />
                      </ListItemButton>
                      <ListItemButton
                        className={classes.listItem}
                        sx={{ borderRadius: `${customization.borderRadius}px` }}
                        selected={selectedIndex === 4}
                        onClick={() => handleNavigate('/account/connectaccounts')}
                      >
                        <ListItemIcon>
                          <IconKey stroke={1.5} size="1.3rem" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body2">Connect Social Accounts</Typography>} />
                      </ListItemButton>
                      <ListItemButton
                        className={classes.listItem}
                        sx={{ borderRadius: `${customization.borderRadius}px` }}
                        selected={selectedIndex === 4}
                        onClick={() => handleNavigate('/plans')}
                      >
                        <ListItemIcon>
                          <IconBusinessplan stroke={1.5} size="1.3rem" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body2">Plans</Typography>} />
                      </ListItemButton>
                      <ListItemButton
                        className={classes.listItem}
                        sx={{ borderRadius: `${customization.borderRadius}px` }}
                        selected={selectedIndex === 4}
                        onClick={() => handleNavigate('/account/billing')}
                      >
                        <ListItemIcon>
                          <IconCreditCard stroke={1.5} size="1.3rem" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body2">Billings</Typography>} />
                      </ListItemButton>
                      <ListItemButton
                        className={classes.listItem}
                        sx={{ borderRadius: `${customization.borderRadius}px` }}
                        selected={selectedIndex === 4}
                        onClick={handleLogout}
                      >
                        <ListItemIcon>
                          <IconLogout stroke={1.5} size="1.3rem" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                      </ListItemButton>
                    </List>
                  </CardContent>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
