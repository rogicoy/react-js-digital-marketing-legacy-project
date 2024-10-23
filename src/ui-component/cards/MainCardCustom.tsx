/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { CSSProperties, FC, forwardRef, ReactNode, Ref } from 'react';
import clsx from 'clsx';

// material-ui
import { useTheme, Theme } from '@material-ui/core/styles';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TypographyProps,
  CardProps,
  CardHeaderProps,
  CardContentProps
} from '@material-ui/core';

// project imports
import { KeyedObject } from 'types';
import { makeStyles } from '@material-ui/styles';

// assets
import BubbleImage from 'assets/images/pages/bubble.png';
import HalfBubbleImage from 'assets/images/pages/half-bubble.png';

// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 }
};

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontSize: '2.125rem',
    fontWeight: 'bold'
  },
  subTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '24px',
    paddingLeft: '24px',
    paddingBottom: '45px'
  },
  floatingImage: {
    position: 'absolute',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top center'
  },
  action: {
    margin: '40px 40px 40px auto'
  }
}));

// ==============================|| CUSTOM MAIN CARD ||============================== //

export interface MainCardCustomProps extends KeyedObject {
  icon?: ReactNode | string;
  border?: boolean;
  boxShadow?: boolean;
  children?: ReactNode | string;
  style?: CSSProperties;
  content?: boolean;
  className?: string;
  contentClass?: string;
  contentSX?: CardContentProps['sx'];
  darkTitle?: boolean;
  sx?: CardProps['sx'];
  secondary?: CardHeaderProps['action'];
  shadow?: string;
  elevation?: number;
  title?: ReactNode | string;
  subTitle?: ReactNode | string;
  sxCardHeader?: CardProps['sx'];
  titleVariant?: TypographyProps['variant'];
  defaultSizeTitle?: boolean;
  hasFloatingImages?: boolean;
  titleWhite?: boolean;
  hideSmallFloatingImage?: boolean;
  action?: ReactNode;
}

const MainCardCustom: FC<MainCardCustomProps> = forwardRef(
  (
    {
      icon,
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
      subTitle,
      sxCardHeader,
      titleVariant = 'h3',
      defaultSizeTitle = false,
      hasFloatingImages = false,
      titleWhite = false,
      hideSmallFloatingImage = false,
      action,
      ...others
    }: MainCardCustomProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const theme = useTheme();
    const classes = useStyles();

    return (
      <>
        <Box sx={{ position: 'relative' }}>
          <Card
            ref={ref}
            {...others}
            sx={{
              ...(action ? { display: 'flex' } : {}),
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
            {/* card icon */}
            {icon && <Box>{icon}</Box>}

            {/* card header and action */}
            {!darkTitle && title && (
              <Box>
                <CardHeader
                  sx={{
                    ...(action ? { paddingTop: '40px' } : {}),
                    headerSX,
                    ...sxCardHeader
                  }}
                  title={
                    <Typography
                      variant={titleVariant}
                      className={clsx(!defaultSizeTitle && classes.title)}
                      sx={{ color: titleWhite ? '#ffffff' : '' }}
                    >
                      {title}
                    </Typography>
                  }
                  action={!subTitle && secondary}
                />

                {subTitle && (
                  <Box className={classes.subTitle}>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{ color: titleWhite ? '#ffffff' : '', fontWeight: 'normal', maxWidth: '60%', lineHeight: 1.5 }}
                    >
                      {subTitle}
                    </Typography>
                    <Box>{secondary}</Box>
                  </Box>
                )}
              </Box>
            )}

            {action && <Box className={classes.action}>{action}</Box>}

            {/* content & header divider */}
            {/* {title && <Divider />} */}

            {/* {!content && children} */}
          </Card>

          {hasFloatingImages && (
            <>
              <Box
                className={classes.floatingImage}
                sx={{
                  backgroundImage: `url(${BubbleImage})`,
                  height: '100px',
                  width: '180px',
                  right: 0,
                  top: 0
                }}
              />

              {!hideSmallFloatingImage && (
                <Box
                  className={classes.floatingImage}
                  sx={{
                    backgroundImage: `url(${HalfBubbleImage})`,
                    height: '50px',
                    width: '60px',
                    left: 0,
                    bottom: '-20px'
                  }}
                />
              )}
            </>
          )}
        </Box>

        {/* card content */}
        {content && children && (
          <Card sx={{ marginTop: '24px' }}>
            <CardContent sx={contentSX} className={contentClass}>
              {children}
            </CardContent>
          </Card>
        )}
      </>
    );
  }
);

export default MainCardCustom;
