/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Box, ButtonBase, Theme } from '@material-ui/core';

// project imports
import LogoSection from '../LogoSection';
import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';

// assets
import { IconMenu2 } from '@tabler/icons';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  grow: {
    flexGrow: 1
  },
  headerAvatar: {
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    transition: 'all .2s ease-in-out',
    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
    color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
    '&:hover': {
      background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
      color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
    }
  },
  boxContainer: {
    width: '228px',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      width: 'auto'
    }
  }
}));

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

export interface HeaderProps {
  handleLeftDrawerToggle: () => void;
}

const Header = ({ handleLeftDrawerToggle }: HeaderProps) => {
  const classes = useStyles();

  return (
    <>
      {/* logo & toggler button */}
      <div className={classes.boxContainer}>
        <Box component="span" sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar variant="rounded" className={classes.headerAvatar} onClick={handleLeftDrawerToggle} color="inherit">
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </div>

      {/* header search */}
      <div className={classes.grow} />
      <div className={classes.grow} />

      {/* notification & profile */}
      <NotificationSection />
      <ProfileSection />

      {/* mobile header */}
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <MobileSection />
      </Box>
    </>
  );
};

export default Header;
