/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useEffect, useState } from 'react';
import party from 'party-js';
import { format } from 'date-fns';
import { Button, DialogActions, DialogContent, Divider, Grid, Menu, MenuItem, Stack, Typography } from '@material-ui/core';
import { gridSpacing } from 'views/common/constant';
import { ISocialType } from 'types';
import { ISucessDialog } from '../interface';

// components
import SocialBadge from 'ui-component/extended/SocialBadge';

// assets
import Profile from 'assets/images/users/profile.png';
import SvgRocket from 'assets/images/icons/rocket.svg';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

const Success: FC<ISucessDialog> = ({ active, postDetails, onClose, menuItems, handleAddClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeSocial = (value: ISocialType) => {
    handleAddClick(value);
    handleClose();
    onClose();
  };

  useEffect(() => {
    const showConfetti = document.querySelector('.confetti');
    if (showConfetti) {
      setTimeout(() => {
        // @ts-ignore
        party.sparkles(showConfetti, {
          count: 15,
          size: 1
        });
      }, 500);
    }
  }, []);

  return (
    <>
      <DialogContent sx={{ textAlign: 'center', p: 10 }}>
        <Grid container spacing={gridSpacing}>
          <Grid item container spacing={gridSpacing}>
            <Grid item xs={12}>
              <div
                style={{
                  background: 'linear-gradient(180deg, #B39DDB 0%, #7F66EB 100%)',
                  height: '145px',
                  width: '100%',
                  position: 'absolute',
                  top: 0,
                  right: 0
                }}
              />
              <Typography
                component="div"
                className="confetti"
                sx={{
                  backgroundImage: `url(${SvgRocket})`,
                  position: 'relative',
                  backgroundPosition: 'center center',
                  height: '115px',
                  width: '195px',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  margin: 'auto'
                }}
              />
              {/* <img
                  src={SvgRocket}
                  alt="Rocket"
                  style={{
                    height: '170px',
                    width: '170px'
                  }}
                /> */}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h2">Congrats! Your post is now scheduled!</Typography>
            </Grid>
            <Grid item xs={12}>
              {postDetails && (
                <Typography variant="subtitle1" sx={{ color: '#808080', fontWeight: 'normal' }}>
                  It will be uploaded on <span style={{ color: '#000000' }}>{format(new Date(postDetails.start), 'EEEE MMMM do')}</span> and{' '}
                  <span style={{ color: '#000000' }}>{format(new Date(postDetails.start), 'h.maaa')}</span> on{' '}
                  <span style={{ color: '#000000' }}>{active}</span>.
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid item container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ color: '#808080', mb: '15px', fontWeight: 'normal' }}>
                Forgot something? Duplicate this post for a different platform.
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  paddingY: 1,
                  borderColor: (theme) => theme.palette.grey[100],
                  backgroundColor: (theme) => theme.palette.grey[100]
                }}
                onClick={handleClick}
              >
                <Typography
                  sx={{
                    p: 1,
                    color: (theme) => theme.palette.text.dark
                  }}
                >
                  Duplicate this post
                </Typography>
                <KeyboardArrowDown fontSize="small" htmlColor="#212121" />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}
              >
                {menuItems
                  .filter((item) => !item.disabled)
                  .map((item) => (
                    <MenuItem key={item.id} onClick={() => handleChangeSocial(item.social)}>
                      <SocialBadge social={item.social} avatarProps={{ src: item?.socialPic || Profile }} />
                      <Typography
                        sx={{
                          paddingX: 2,
                          fontWeight: 'bold',
                          color: (theme) => theme.palette.text.dark
                        }}
                      >
                        {item.label}
                      </Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 2.5 }}>
        <Grid container justifyContent="end" alignItems="center">
          <Grid item>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button type="button" variant="outlined" onClick={onClose}>
                Close
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};

export default Success;
