/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { CSSProperties, FC, ReactChild } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Box, Theme } from '@material-ui/core';

// assets
import Bubble1 from 'assets/images/pages/bubble.png';
import Bubble2 from 'assets/images/pages/bubble2.png';
import Bubble3 from 'assets/images/pages/bubble3.png';
import Bubble4 from 'assets/images/pages/bubble4.png';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary.light,
    minHeight: '100vh',
    position: 'relative'
  },
  bubble1: {
    width: '355px',
    height: '135px',
    position: 'absolute',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    left: '10px',
    top: 0
  },
  bubble2: {
    width: '355px',
    height: '135px',
    position: 'absolute',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    right: 0,
    bottom: 0
  },
  bubble3: {
    width: '750px',
    height: '265px',
    position: 'absolute',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    left: 0,
    bottom: 0
  },
  bubble4: {
    width: '355px',
    height: '135px',
    position: 'absolute',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    right: 0,
    top: 0
  }
}));

interface IAuthWrapper {
  isOnboarding?: boolean;
  isWelcome?: boolean;
  sx?: CSSProperties;
  children: ReactChild;
}

const AuthWrapper3: FC<IAuthWrapper> = ({ isOnboarding = false, isWelcome = false, sx, children }) => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper} style={{ ...sx }}>
      <div>{children}</div>

      <div>
        {isOnboarding && (
          <>
            <Box sx={{ backgroundImage: `url(${Bubble1})` }} className={styles.bubble1} />
            <Box sx={{ backgroundImage: `url(${Bubble2})` }} className={styles.bubble2} />
          </>
        )}

        {isWelcome && (
          <>
            <Box sx={{ backgroundImage: `url(${Bubble3})` }} className={styles.bubble3} />
            <Box sx={{ backgroundImage: `url(${Bubble4})` }} className={styles.bubble4} />
          </>
        )}
      </div>
    </div>
  );
};

export default AuthWrapper3;
