/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { useTheme, Theme } from '@material-ui/core/styles';
import { AppBar, Box, ButtonBase, ClickAwayListener, Grid, Paper, Popper, Toolbar, useMediaQuery } from '@material-ui/core';

// project imports
import Transitions from 'ui-component/extended/Transitions';

// assets
import { IconDotsVertical } from '@tabler/icons';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  grow: {
    // flexGrow: 1
  },
  paperContainer: {
    [theme.breakpoints.down('sm')]: {
      background: theme.palette.mode === 'dark' ? theme.palette.dark[800] : '#fff'
    }
  },
  popperContainer: {
    width: '100%',
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      top: '20px !important'
    }
  },
  menuIcon: {
    fontSize: '1.5rem',
    marginLeft: '4px',
    cursor: 'pointer'
  },
  toolbar: {
    paddingTop: '22px',
    paddingBottom: '22px'
  }
}));

// ==============================|| MOBILE HEADER ||============================== //

const MobileSection = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = React.useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = React.useRef<any>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
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
      <Box
        component="span"
        ref={anchorRef}
        sx={{
          mt: 1,
          ml: 1
        }}
      >
        <ButtonBase centerRipple sx={{ color: theme.palette.mode === 'dark' ? 'primary.main' : 'inherit' }}>
          <IconDotsVertical
            stroke={1.5}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            className={classes.menuIcon}
          />
        </ButtonBase>
      </Box>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        className={classes.popperContainer}
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 10]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="zoom" in={open} {...TransitionProps} sx={{ transformOrigin: 'top right' }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <AppBar color="inherit" className={classes.paperContainer}>
                  <Toolbar className={classes.toolbar}>
                    <Grid container justifyContent={matchMobile ? 'space-between' : 'flex-end'} alignItems="center">
                      Options here
                    </Grid>
                  </Toolbar>
                </AppBar>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default MobileSection;
