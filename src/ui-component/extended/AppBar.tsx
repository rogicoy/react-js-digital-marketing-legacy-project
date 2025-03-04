/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import {
  AppBar as MuiAppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger
} from '@material-ui/core';

// project imports
import Logo from 'ui-component/Logo';

// assets
import { IconBook, IconCreditCard, IconDashboard, IconHome2 } from '@tabler/icons';
import MenuIcon from '@material-ui/icons/Menu';

// elevation scroll
export interface ElevationScrollProps {
  children: ReactElement;
  window?: Window | Node;
}
function ElevationScroll(props: ElevationScrollProps) {
  const { children, window } = props;
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window!
  });
  const darkBorder = theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.grey[200];

  return React.cloneElement(children, {
    elevation: trigger ? 2 : 0,
    style: {
      backgroundColor: theme.palette.background.default,
      borderBottom: trigger ? 'none' : '1px solid',
      borderColor: trigger ? '' : darkBorder,
      color: theme.palette.text.dark
    }
  });
}

// ==============================|| MINIMAL LAYOUT APP BAR ||============================== //

const AppBar = ({ ...others }) => {
  const [drawerToggle, setDrawerToggle] = React.useState<boolean>(false);
  /** Method called on multiple components with different event types */
  const drawerToggler = (open: boolean) => (event: any) => {
    if (event.type! === 'keydown' && (event.key! === 'Tab' || event.key! === 'Shift')) {
      return;
    }
    setDrawerToggle(open);
  };

  return (
    <ElevationScroll {...others}>
      <MuiAppBar>
        <Container>
          <Toolbar>
            <Typography component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
              <Logo />
            </Typography>
            <Stack direction="row" sx={{ display: { xs: 'none', sm: 'block' } }} spacing={2}>
              <Button color="inherit" component={Link} href="#" target="_blank">
                Home
              </Button>
              <Button color="inherit" component={RouterLink} to="/login" target="_blank">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} href="https://removed" target="_blank">
                Documentation
              </Button>
              <Button
                component={Link}
                href="removed"
                disableElevation
                variant="contained"
                color="secondary"
              >
                Purchase Now
              </Button>
            </Stack>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <IconButton color="inherit" onClick={drawerToggler(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="top" open={drawerToggle} onClose={drawerToggler(false)}>
                <Box
                  sx={{
                    width: 'auto'
                  }}
                  role="presentation"
                  onClick={drawerToggler(false)}
                  onKeyDown={drawerToggler(false)}
                >
                  <List>
                    <Link style={{ textDecoration: 'none' }} href="#" target="_blank">
                      <ListItemButton component="a">
                        <ListItemIcon>
                          <IconHome2 />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                      </ListItemButton>
                    </Link>
                    <Link style={{ textDecoration: 'none' }} href="/login" target="_blank">
                      <ListItemButton component="a">
                        <ListItemIcon>
                          <IconDashboard />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                      </ListItemButton>
                    </Link>
                    <Link style={{ textDecoration: 'none' }} href="https://removed" target="_blank">
                      <ListItemButton component="a">
                        <ListItemIcon>
                          <IconBook />
                        </ListItemIcon>
                        <ListItemText primary="Documentation" />
                      </ListItemButton>
                    </Link>
                    <Link
                      style={{ textDecoration: 'none' }}
                      href="https://removed"
                      target="_blank"
                    >
                      <ListItemButton component="a">
                        <ListItemIcon>
                          <IconCreditCard />
                        </ListItemIcon>
                        <ListItemText primary="Purchase Now" />
                      </ListItemButton>
                    </Link>
                  </List>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </ElevationScroll>
  );
};

export default AppBar;
