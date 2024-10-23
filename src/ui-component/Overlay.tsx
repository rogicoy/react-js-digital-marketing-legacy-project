/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import React from 'react';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9,
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(4px)'
  }
}));

// ==============================|| Overlay ||============================== //

const Overlay: React.FC<{ children: React.ReactChildren | React.ReactNode }> = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

export default Overlay;
