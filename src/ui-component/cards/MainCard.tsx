/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { Ref } from 'react';
import clsx from 'clsx';

// material-ui
import { useTheme, Theme } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  TypographyProps,
  CardProps,
  CardHeaderProps,
  CardContentProps
} from '@material-ui/core';

// project imports
import { KeyedObject } from 'types';
import { makeStyles } from '@material-ui/styles';

// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 }
};

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontSize: '2.125rem',
    fontWeight: 'bold'
  }
}));

// ==============================|| CUSTOM MAIN CARD ||============================== //

export interface MainCardProps extends KeyedObject {
  border?: boolean;
  boxShadow?: boolean;
  children: React.ReactNode | string;
  style?: React.CSSProperties;
  content?: boolean;
  className?: string;
  contentClass?: string;
  contentSX?: CardContentProps['sx'];
  darkTitle?: boolean;
  sx?: CardProps['sx'];
  secondary?: CardHeaderProps['action'];
  shadow?: string;
  elevation?: number;
  title?: React.ReactNode | string;
  sxCardHeader?: CardProps['sx'];
  titleVariant?: TypographyProps['variant'];
  defaultSizeTitle?: boolean;
}

const MainCard: React.FC<MainCardProps> = React.forwardRef(
  (
    {
      border,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      sxCardHeader,
      titleVariant = 'h3',
      defaultSizeTitle = false,
      ...others
    }: MainCardProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const theme = useTheme();
    const classes = useStyles();

    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75,
          ':hover': {
            boxShadow: boxShadow
              ? shadow || (theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)')
              : 'inherit'
          },
          ...sx
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader
            sx={{
              headerSX,
              ...sxCardHeader
            }}
            title={
              <Typography variant={titleVariant} className={clsx(!defaultSizeTitle && classes.title)}>
                {title}
              </Typography>
            }
            action={secondary}
          />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={{
              headerSX,
              ...sxCardHeader
            }}
            title={<Typography variant={titleVariant}>{title}</Typography>}
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && <Divider />}

        {/* card content */}
        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

export default MainCard;
