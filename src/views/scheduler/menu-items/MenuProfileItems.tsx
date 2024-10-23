/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useState } from 'react';
import { ISocialType, ISocialMenuScheduler } from 'types';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Button, Menu, MenuItem, Typography, Theme } from '@material-ui/core';

// components
import SocialBadge from 'ui-component/extended/SocialBadge';

// assets
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Profile from 'assets/images/users/profile.png';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  menuPopOpverPaper: {
    width: 250
  },
  secondaryButton: {
    borderColor: theme.palette.grey[100],
    backgroundColor: theme.palette.grey[100],
    zIndex: 99,
    '&:hover': {
      backgroundColor: theme.palette.grey[100]
    }
  }
}));

interface IMenuProfileItems {
  menuItems: ISocialMenuScheduler[];
  handleAddClick: (x: ISocialType) => void;
}

const MenuProfileItems: FC<IMenuProfileItems> = ({ menuItems, handleAddClick }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button disableElevation variant="contained" className={classes.secondaryButton} onClick={handleClick}>
        <Typography
          sx={{
            p: 1,
            color: (theme) => theme.palette.text.dark
          }}
        >
          Schedule New Post
        </Typography>
        <KeyboardArrowDown fontSize="small" htmlColor="#212121" />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        PopoverClasses={{
          paper: classes.menuPopOpverPaper
        }}
      >
        {menuItems
          .filter((item: ISocialMenuScheduler) => !item.disabled)
          .sort((a: ISocialMenuScheduler, b: ISocialMenuScheduler) => a.order - b.order)
          .map((item) => (
            <MenuItem
              key={item.id}
              onClick={() => {
                handleAddClick(item.social);
                handleClose();
              }}
            >
              <SocialBadge social={item.social} avatarProps={{ src: item.socialPic || Profile }} />
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
    </>
  );
};
export default MenuProfileItems;
