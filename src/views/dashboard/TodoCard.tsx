/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useNavigate } from 'react-router';
// material-ui
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Theme, Box } from '@material-ui/core';

import { IconArrowRight } from '@tabler/icons';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'views/common/constant';
import NewAdBrief from 'assets/images/icons/new-ad-brief.svg';
import NewAdBriefHover from 'assets/images/icons/new-ad-brief-hover.svg';
import UploadImage from 'assets/images/icons/upload-image.svg';
import UploadImageHover from 'assets/images/icons/upload-image-hover.svg';
import ViewCampaigns from 'assets/images/icons/view-campaigns.svg';
import ViewCampaignsHover from 'assets/images/icons/view-campaigns-hover.svg';
import LevelUp from 'assets/images/icons/level-up.svg';
import LevelUpHover from 'assets/images/icons/level-up-hover.svg';
import { useState } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  labelRoot: {},
  card: {
    height: 178,
    borderRadius: '1rem',
    '& .target': {
      cursor: 'pointer'
    },
    '& svg': {
      color: '#000'
    },
    '&.hovered': {
      '& .MuiBox-root': {
        height: 178,
        backgroundColor: '#874BEE',
        MozTransition: 'height .25s ease',
        WebkitTransition: 'height .25s ease',
        OTransition: 'height .25s ease',
        transition: 'height .25s ease'
      },
      '& .MuiTypography-root': {
        color: '#FFF !important'
      },
      '& svg': {
        color: '#FFF',
        WebkitTransition: 'all 0.5s ease-out'
      }
    }
  },
  box: {
    position: 'absolute',
    padding: '1rem',
    width: '100%',
    height: 124,
    backgroundColor: '#E6E8F3',
    borderBottomLeftRadius: '1rem',
    borderBottomRightRadius: '1rem'
  }
}));

const TodoCard = (props: any) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const ItemCard = ({ text, url, src, srcHover }: any) => {
    const [hovered, setHovered] = useState(false);
    return (
      <MainCard className={clsx(classes.card, { hovered })} contentSX={{ p: '0!important' }}>
        <div
          className="target"
          tabIndex={0}
          onClick={() => navigate(url)}
          onMouseOver={() => setHovered(true)}
          onMouseOut={() => setHovered(false)}
          onFocus={() => {}}
          onBlur={() => {}}
        >
          <Grid container spacing={0}>
            <Grid item xs={12} sx={{ position: 'relative' }}>
              <Box className={classes.box}>
                <Grid container spacing={0}>
                  <Grid item xs={hovered ? 11 : 10}>
                    <img alt="ad brief" src={hovered ? srcHover : src} height={92} />
                  </Grid>
                  <Grid item xs={hovered ? 1 : 2}>
                    <IconArrowRight stroke={3} size="1.75rem" />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ position: 'absolute', bottom: 0 }}>
              <Typography sx={{ p: 2, fontWeight: 600 }} classes={{ root: classes.labelRoot }}>
                {text}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </MainCard>
    );
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography gutterBottom variant="h2" sx={{ mb: 0 }}>
          What would you like to do?
        </Typography>
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={3} sx={{ position: 'relative' }}>
        <ItemCard text="Create New Ad" url="/ads/create" src={NewAdBrief} srcHover={NewAdBriefHover} />
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={3} sx={{ position: 'relative' }}>
        <ItemCard text="Upload Images & Videos" url="/gallery" src={UploadImage} srcHover={UploadImageHover} />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3} sx={{ position: 'relative' }}>
        <ItemCard text="View Ad Campaigns" url="/ads/campaigns" src={ViewCampaigns} srcHover={ViewCampaignsHover} />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3} sx={{ position: 'relative' }}>
        <ItemCard text="View Scheduled Posts" url="/scheduler" src={LevelUp} srcHover={LevelUpHover} />
      </Grid>
    </Grid>
  );
};

export default TodoCard;
