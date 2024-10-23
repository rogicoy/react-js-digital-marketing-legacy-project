/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useState, useMemo, useEffect, FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import upperFirst from 'lodash/upperFirst';
import { ISocialType } from 'types';
import { IFacebookPage, IInstagramPage, ILinkedInPage, ISocialMenuItems, ITwitterPage } from './interface';
import { gridSpacing } from 'views/common/constant';
import helpers from 'utils/helpers';

// grapqhl
import { useQuery } from '@apollo/client';
import gql from 'store/account/socials/gql';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Box, Button, Typography, Menu, MenuItem, Grid, Theme } from '@material-ui/core';

import { jsPDF as JSPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// project imports
import MainCardCustom from 'ui-component/cards/MainCardCustom';
import InsightSkeleton from 'ui-component/cards/Skeleton/InsightsSkeleton';
import SocialBadge from 'ui-component/extended/SocialBadge';
import ActiveTab from 'ui-component/ActiveTab';
import InstagramTabs from './instagram/Instagram';
import LinkedinTabs from './linkedin/Linkedin';
import TwitterTabs from './twitter/Twitter';
import FacebookTabs from './facebook/Facebook';
import MainInsights from './main-insights/MainInsights';

// assets
import Profile from 'assets/images/users/profile.png';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import DateRangePicker, { getDateRange, IDatePreset, IDateRange } from 'ui-component/date-range-picker';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  menuPopOpverPaper: {
    width: 320
  },
  secondaryButton: {
    height: 62,
    width: 320,
    paddingY: 1,
    paddingX: 2,
    borderColor: theme.palette.grey[100],
    backgroundColor: theme.palette.grey[100],
    zIndex: 99,
    '&:hover': {
      backgroundColor: theme.palette.grey[100]
    }
  }
}));

const Insights: FC = () => {
  const classes = useStyles();
  // route
  const { social } = useParams();
  const navigate = useNavigate();

  // query
  const {
    query: { facebookPageReport, instagramPageReport, twitterConnection, linkedinPageReport }
  } = gql;

  // @facebook
  const { data: fbPageData, loading: fbPageLoading } = useQuery<{
    facebookPageReport: IFacebookPage;
  }>(facebookPageReport, {
    fetchPolicy: 'network-only'
  });
  const fbPageDetails = fbPageData?.facebookPageReport || null;

  // @instagram
  const { data: igPageData, loading: igPageLoading } = useQuery<{
    instagramPageReport: IInstagramPage;
  }>(instagramPageReport, {
    fetchPolicy: 'network-only'
  });
  const igPageDetails = igPageData?.instagramPageReport || null;

  // @twitter
  const { data: twitterPageData, loading: twitterPageLoading } = useQuery<{
    twitterConnection: ITwitterPage;
  }>(twitterConnection, {
    fetchPolicy: 'network-only',
    variables: {
      type: 'analytics'
    }
  });
  const twitterPageDetails = twitterPageData?.twitterConnection || null;

  // @linkedin
  const { data: linkedInPageData, loading: linkedInPageLoading } = useQuery<{
    linkedinPageReport: ILinkedInPage;
  }>(linkedinPageReport, {
    fetchPolicy: 'network-only'
  });
  const linkedInPageDetails = linkedInPageData?.linkedinPageReport || null;

  // states
  const [activeSocial, setActiveSocial] = useState<ISocialType | null>((social as ISocialType) || null);
  const [lastCollectedDate] = useState(new Date());

  // should be constant
  const [menuItems, setMenuItems] = useState<Array<ISocialMenuItems>>([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dateRange, setDateRange] = useState<{ value: IDatePreset; range: IDateRange }>({
    value: 'today',
    range: getDateRange('today')
  });
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeSocial = (value: ISocialType | null) => {
    handleClose();
    setActiveSocial(value);

    // needs to be redirected always to overview of the main page
    if (value !== null) {
      navigate(`/insights/${value}/overview`);
    } else {
      navigate(`/insights`);
    }
  };

  const handleExport = () => {
    const element = document.getElementById('OrganicInsightsGrid');
    if (element) {
      const w = element.offsetWidth as any;
      const h = element.offsetHeight as any;
      html2canvas(element).then((canvas) => {
        const img = canvas.toDataURL('image/jpeg', 10);
        const doc = new JSPDF('portrait', 'px', [w + 24, h]);
        doc.addImage(img, 'JPEG', 0, 0, w, h);
        doc.save('Organic Insights.pdf');
      });
    }
  };

  // to get current social
  useEffect(() => {
    if (social) {
      setActiveSocial(social as ISocialType);
    } else {
      setActiveSocial(null);
    }
  }, [social]);

  // fb page details
  useEffect(() => {
    if (fbPageDetails) {
      const fbObj: ISocialMenuItems = {
        id: fbPageDetails.id,
        label: fbPageDetails.name,
        social: 'facebook',
        socialId: fbPageDetails.id,
        socialPic: fbPageDetails.profile,
        order: 1
      };

      setMenuItems((prev) => [...prev, fbObj]);
    }
  }, [fbPageDetails]);

  // ig page details
  useEffect(() => {
    if (igPageDetails) {
      const igObj: ISocialMenuItems = {
        id: igPageDetails.id,
        label: igPageDetails.name,
        social: 'instagram',
        socialId: igPageDetails.id,
        socialPic: igPageDetails.profile,
        order: 2
      };

      // for instagram
      setMenuItems((prev) => [...prev, igObj]);
    }
  }, [igPageDetails]);

  // twitter page details
  useEffect(() => {
    if (twitterPageDetails) {
      const twitterObj: ISocialMenuItems = {
        id: twitterPageDetails.id,
        label: twitterPageDetails.name,
        social: 'twitter',
        socialId: twitterPageDetails.id,
        socialPic: twitterPageDetails.profilePic,
        order: 4
      };

      // for twitter
      setMenuItems((prev) => [...prev, twitterObj]);
    }
  }, [twitterPageDetails]);

  // linkedin page details
  useEffect(() => {
    if (linkedInPageDetails) {
      const linkedInObj: ISocialMenuItems = {
        id: linkedInPageDetails.id,
        label: linkedInPageDetails.name,
        social: 'linkedin',
        socialId: linkedInPageDetails.id,
        socialPic: linkedInPageDetails.profile,
        order: 4
      };

      // for twitter
      setMenuItems((prev) => [...prev, linkedInObj]);
    }
  }, [linkedInPageDetails]);

  const activeItem = useMemo(() => {
    const findItem = menuItems.find((item: ISocialMenuItems) => item.social === activeSocial);
    const filterItem = menuItems.filter((item: ISocialMenuItems) => item.social !== activeSocial);
    const uniqueFilterItem = helpers.getUniqueListBy(filterItem, 'id');

    return {
      findItem,
      filterItem: uniqueFilterItem
    };
  }, [menuItems, activeSocial]);

  const handleDateRangeChange = (value: IDatePreset, range: IDateRange) => {
    setDateRange({ value, range });
  };

  if (fbPageLoading || igPageLoading || twitterPageLoading || linkedInPageLoading) return <InsightSkeleton boxNumber={3} />;

  return (
    <Grid id="OrganicInsightsGrid" container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCardCustom
          title="Organic Insights"
          subTitle="We’ve crunched the numbers so you can keep track of your post’s performance. Use these insights to optimise your future content."
          sx={{
            background: 'linear-gradient(#7F66EB 0%, #9618F7 100%)'
          }}
          content={activeSocial !== null}
          hasFloatingImages
          titleWhite
          secondary={
            <>
              <Button
                variant="outlined"
                className={classes.secondaryButton}
                sx={{ justifyContent: activeSocial === null ? 'space-between' : 'flex-start' }}
                onClick={handleClick}
              >
                {activeSocial !== null ? (
                  <>
                    <SocialBadge social={activeSocial} avatarProps={{ src: activeItem.findItem?.socialPic || Profile }} />
                    <Typography
                      sx={{
                        paddingX: 2,
                        color: (theme) => theme.palette.text.dark
                      }}
                      component="div"
                    >
                      {activeItem.findItem?.label}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography
                      sx={{
                        p: 1,
                        color: (theme) => theme.palette.text.dark
                      }}
                      component="div"
                    >
                      Select platform
                    </Typography>
                    <KeyboardArrowDown fontSize="small" htmlColor="#212121" />
                  </>
                )}
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
                {activeSocial !== null && (
                  <MenuItem onClick={() => handleChangeSocial(null)}>
                    <Typography
                      sx={{
                        p: 1,
                        color: (theme) => theme.palette.text.dark
                      }}
                      component="div"
                    >
                      Overview
                    </Typography>
                  </MenuItem>
                )}

                {activeItem.filterItem
                  .sort((a: ISocialMenuItems, b: ISocialMenuItems) => a.order - b.order)
                  .map((item: ISocialMenuItems, index) => (
                    <MenuItem key={`${item.label}-${item.id}`} onClick={() => handleChangeSocial(item.social)}>
                      <SocialBadge social={item.social} avatarProps={{ src: item.socialPic }} />
                      <Typography
                        sx={{
                          paddingX: 2,
                          color: (theme) => theme.palette.text.dark
                        }}
                        component="div"
                      >
                        {item.label}
                      </Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </>
          }
        >
          {activeSocial !== null && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Box>
                <Typography variant="h3" component="div">
                  {upperFirst(activeSocial)}
                </Typography>
                <Typography gutterBottom component="div">
                  {activeItem.findItem?.label}
                </Typography>
                <Typography variant="h3" component="div" sx={{ fontWeight: 500 }}>
                  {dateRange.range?.from ? format(dateRange.range?.from, 'do LLLL yyyy') : ''} -{' '}
                  {dateRange.range?.to ? format(dateRange.range?.to, 'do LLLL yyyy') : ''}
                </Typography>
                <Typography variant="caption" component="div">
                  Data last collected: {format(lastCollectedDate, 'do LLLL, h.mmaaa')}
                </Typography>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <DateRangePicker value={dateRange.value} onChange={handleDateRangeChange} />
              </Box>
            </Box>
          )}

          {activeSocial !== null && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}
            >
              <ActiveTab social={activeSocial} onExport={handleExport} />
            </Box>
          )}
        </MainCardCustom>
      </Grid>

      <Grid item xs={12}>
        {activeSocial === null && (
          <MainInsights
            facebook={fbPageDetails}
            instagram={igPageDetails}
            twitter={twitterPageDetails}
            linkedIn={linkedInPageDetails}
            dateRange={dateRange.range}
          />
        )}
        {activeSocial === 'instagram' && <InstagramTabs dateRange={dateRange.range} />}
        {activeSocial === 'linkedin' && <LinkedinTabs dateRange={dateRange.range} />}
        {activeSocial === 'twitter' && <TwitterTabs dateRange={dateRange.range} />}
        {activeSocial === 'facebook' && <FacebookTabs dateRange={dateRange.range} />}
      </Grid>
    </Grid>
  );
};

export default Insights;
