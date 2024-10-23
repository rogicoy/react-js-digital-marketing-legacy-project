/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';

// material-ui
import { Avatar, Menu, MenuItem } from '@material-ui/core';

// assets
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FileCopyTwoToneIcon from '@material-ui/icons/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@material-ui/icons/PictureAsPdfOutlined';

interface IExportButton {
  color?: string;
}

const ExportButton: React.FC<IExportButton> = ({ color }) => {
  const [anchorEl, setAnchorEl] = React.useState<Element | ((element: Element) => Element) | null | undefined>(null);

  const handleClick = (event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Avatar sx={{ backgroundColor: 'transparent', color: color || 'grey.500', cursor: 'pointer' }} onClick={handleClick}>
        <MoreHorizIcon fontSize="inherit" />
      </Avatar>
      <Menu
        id="menu-earning-card"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        variant="selectedMenu"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem onClick={handleClose}>
          <FileCopyTwoToneIcon sx={{ fontSize: '1.5rem', mr: 2 }} /> Copy Data
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <PictureAsPdfTwoToneIcon sx={{ fontSize: '1.5rem', mr: 2 }} /> Export
        </MenuItem>
      </Menu>
    </>
  );
};

export default ExportButton;
