/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';
import { Badge, BadgeProps, useTheme } from '@material-ui/core';
import { ISocialType } from 'types';
import { socialColors } from 'views/common/constant';

// components
import Avatar, { ExtendedAvatarProps } from 'ui-component/extended/Avatar';

// assets
import FbIcon from 'assets/images/icons/fb.png';
import IgIcon from 'assets/images/icons/ig.png';
import TwIcon from 'assets/images/icons/tw.png';
import LiIcon from 'assets/images/icons/li.png';

const icons: {
  [social: string]: string;
} = {
  facebook: FbIcon,
  instagram: IgIcon,
  twitter: TwIcon,
  linkedin: LiIcon
};

interface ISocialBadge {
  social: ISocialType;
  badgeProps?: BadgeProps;
  badgeAvatarProps?: ExtendedAvatarProps;
  avatarProps: ExtendedAvatarProps;
  disabled?: boolean;
}

const SocialBadge: React.FC<ISocialBadge> = (props) => {
  const theme = useTheme();
  const { social, badgeProps, badgeAvatarProps, avatarProps, disabled } = props;
  const socialColor = disabled ? theme.palette.grey[600] : socialColors[social];
  const icon = icons[social] as string;

  return (
    <Badge
      overlap="circular"
      badgeContent={
        <Avatar
          disabled
          color="social"
          socialColor={socialColor}
          sx={{
            width: 14,
            height: 14,
            p: 0.25
          }}
          {...badgeAvatarProps}
        >
          <img
            src={icon}
            alt="icon"
            style={{
              objectFit: 'contain',
              height: 'inherit',
              width: 'inherit',
              filter: disabled ? 'grayscale(100%)' : 'unset'
            }}
          />
        </Avatar>
      }
      {...badgeProps}
    >
      <Avatar
        disabled
        outline
        sx={{
          width: 44,
          height: 44,
          filter: disabled ? 'grayscale(100%)' : 'unset'
        }}
        color="social"
        socialColor={socialColor}
        outlineStyle="dashed"
        {...avatarProps}
      />
    </Badge>
  );
};

export default SocialBadge;
