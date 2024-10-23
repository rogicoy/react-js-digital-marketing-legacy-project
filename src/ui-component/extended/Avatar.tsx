/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';
import omit from 'lodash/omit';

// material-ui
import { makeStyles } from '@material-ui/styles';
import MuiAvatar, { AvatarProps } from '@material-ui/core/Avatar';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { KeyedObject, LinkTarget } from 'types';
import { Theme } from '@material-ui/core/styles';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  primaryBackground: {
    background: theme.palette.primary.main,
    color: theme.palette.background.paper
  },
  secondaryBackground: {
    background: theme.palette.secondary.main,
    color: theme.palette.background.paper
  },
  errorBackground: {
    background: theme.palette.error.main,
    color: theme.palette.background.paper
  },
  warningBackground: {
    background: theme.palette.warning.dark,
    color: theme.palette.background.paper
  },
  infoBackground: {
    background: theme.palette.info.main,
    color: theme.palette.background.paper
  },
  successBackground: {
    background: theme.palette.success.dark,
    color: theme.palette.background.paper
  },
  darkBackground: {
    background: theme.palette.dark.dark,
    color: theme.palette.dark.light
  },
  greyBackground: {
    background: theme.palette.grey[500],
    color: theme.palette.background.paper
  },
  socialBackground: {
    color: theme.palette.background.paper,
    background: (props: ExtendedAvatarProps) => props.socialColor
  },
  primaryOutline: {
    background: theme.palette.background.paper,
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`
  },
  secondaryOutline: {
    background: theme.palette.background.paper,
    color: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.secondary.main}`
  },
  errorOutline: {
    background: theme.palette.background.paper,
    color: theme.palette.error.main,
    border: `1px solid ${theme.palette.error.main}`
  },
  warningOutline: {
    background: theme.palette.background.paper,
    color: theme.palette.warning.dark,
    border: `1px solid ${theme.palette.warning.dark}`
  },
  infoOutline: {
    background: theme.palette.background.paper,
    color: theme.palette.info.main,
    border: `1px solid ${theme.palette.info.main}`
  },
  successOutline: {
    background: theme.palette.background.paper,
    color: theme.palette.success.dark,
    border: `1px solid ${theme.palette.success.dark}`
  },
  greyOutline: {
    background: theme.palette.background.paper,
    color: theme.palette.grey[500],
    border: `1px solid ${theme.palette.grey[500]}`
  },
  darkOutline: {
    background: theme.palette.background.paper,
    color: theme.palette.secondary.dark,
    border: `1px solid ${theme.palette.secondary.dark}`
  },
  socialOutline: {
    background: theme.palette.background.paper,
    color: (props: ExtendedAvatarProps) => props.socialColor,
    border: (props: ExtendedAvatarProps) => `1px ${props.outlineStyle} ${props.socialColor}`
  },
  badge: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5)
  },
  xs: {
    width: theme.spacing(4.25),
    height: theme.spacing(4.25)
  },
  sm: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
  md: {
    width: theme.spacing(7.5),
    height: theme.spacing(7.5)
  },
  lg: {
    width: theme.spacing(9),
    height: theme.spacing(9)
  },
  xl: {
    width: theme.spacing(10.25),
    height: theme.spacing(10.25)
  }
}));

// ==============================|| AVATAR ||============================== //

export interface ExtendedAvatarProps extends AvatarProps {
  alt?: string;
  src?: string;
  className?: string;
  color?: string;
  component?: OverridableComponent<any> /** Any component can override */;
  target?: LinkTarget;
  href?: string;
  children?: React.ReactNode;
  outline?: boolean;
  disabled?: boolean;
  size?: string;
  socialColor?: string;
  outlineStyle?: 'dashed' | 'solid' | 'dotted';
}

const Avatar = (props: ExtendedAvatarProps) => {
  const { className, color, outline, size, ...others } = props;
  const classes = useStyles(props) as KeyedObject;
  let avatarClass: string[] = [];

  const outlineColor = outline ? [classes[`${color}Outline`], ...avatarClass] : [classes[`${color}Background`], ...avatarClass];
  avatarClass = color ? outlineColor : avatarClass;
  avatarClass = size ? [classes[size], ...avatarClass] : avatarClass;
  if (className) {
    avatarClass = className ? [...avatarClass, className] : avatarClass;
  }

  return <MuiAvatar className={avatarClass.join(' ')} {...omit(others, ['outlineStyle', 'socialColor'])} />;
};

Avatar.defaultProps = {
  outlineStyle: 'solid'
};

export default Avatar;
