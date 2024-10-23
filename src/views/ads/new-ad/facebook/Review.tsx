/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Theme,
  Box,
  Button,
  Card,
  Link,
  Stack,
  Typography,
  CardHeader,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  FormControl,
  MenuItem,
  Select,
  Grid,
  Chip,
  ListItem
} from '@material-ui/core';
import MainCardCustom from 'ui-component/cards/MainCardCustom';
import { LocalizationProvider } from '@material-ui/lab';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import AlertCircleIcon from 'assets/images/icons/alert-circle.svg';
import { Field } from 'formik';
import { format } from 'date-fns';

const useStyles = makeStyles((theme: Theme) => ({
  banner: {
    padding: '20px',
    backgroundColor: theme.palette.primary.main
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  bannerText: {
    marginTop: 16,
    color: '#FFFFFF'
  },
  bannerButton: {
    padding: '8px 24px',
    borderRadius: 4,
    color: theme.palette.text.dark,
    background: '#FFFFFF',
    '&:hover': {
      background: '#F1F1F1'
    }
  }
}));

const Review = ({ handleBlur, handleChange, setFieldValue, touched, errors, values }: any) => {
  const classes = useStyles();
  const callToActionItems = ['Sign up', 'Subscribe', 'Apply now', 'Book now', 'Download', 'Get offer', 'Get quote', 'Learn more'];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ margin: '40px auto 0', width: '100%', maxWidth: '1100px' }}>
        <Typography variant="h1" align="center">
          Review Your Campaign Brief
        </Typography>
        <Box sx={{ marginTop: '80px' }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={7}>
              <Box sx={{ padding: '24px', background: 'linear-gradient(180deg, #7F66EB 0%, #9618F7 100%);' }}>
                <Box>
                  <Typography variant="h3" sx={{ color: '#FFFFFF' }}>
                    Campaign Name
                  </Typography>
                  <Typography variant="h4" sx={{ marginTop: '8px', fontWeight: 'normal', color: '#FFFFFF' }}>
                    {values.campaignName}
                  </Typography>
                </Box>
                <Box sx={{ marginTop: '40px' }}>
                  <Typography variant="h3" sx={{ color: '#FFFFFF' }}>
                    Objective
                  </Typography>
                  <Typography variant="h4" sx={{ marginTop: '8px', fontWeight: 'normal', color: '#FFFFFF' }}>
                    {values.objective}
                  </Typography>
                </Box>
                <Box sx={{ marginTop: '40px' }}>
                  <Typography variant="h3" sx={{ color: '#FFFFFF' }}>
                    Budget
                  </Typography>
                  <Typography variant="h4" sx={{ marginTop: '8px', fontWeight: 'normal', color: '#FFFFFF' }}>
                    {values.budgetAmount} {values.budgetType.toLowerCase()}
                  </Typography>
                </Box>
                <Box sx={{ marginTop: '40px' }}>
                  <Typography variant="h3" sx={{ color: '#FFFFFF' }}>
                    Duration
                  </Typography>
                  <Typography variant="h4" sx={{ marginTop: '8px', fontWeight: 'normal', color: '#FFFFFF' }}>
                    {format(values.startDate, 'do LLLL yyyy')}
                    {values.endDate === '' ? ' - ongoing' : ` - ${format(values.endDate, 'do LLLL, h.mmaaa')}`}
                  </Typography>
                </Box>
                <Box sx={{ marginTop: '40px', paddingTop: '40px', borderTop: '1px solid #FFFFFF' }}>
                  <Typography variant="h3" sx={{ color: '#FFFFFF' }}>
                    Tone of voice
                  </Typography>
                  <Box sx={{ marginTop: '16px' }}>
                    {Object.keys(values.toneOfVoice).length > 0 &&
                      Object.keys(values.toneOfVoice).map(
                        (item: any, index: number) =>
                          values.toneOfVoice[item] && (
                            <ListItem key={index} sx={{ display: 'inline-block', marginRight: '8px', width: 'auto', padding: 0 }}>
                              <Chip label={item} sx={{ backgroundColor: '#EDE7F6' }} />
                            </ListItem>
                          )
                      )}
                  </Box>
                </Box>
                <Box sx={{ marginTop: '40px' }}>
                  <Typography variant="h4" sx={{ color: '#FFFFFF' }}>
                    Use Emojis
                  </Typography>
                  <Typography variant="h4" sx={{ marginTop: '8px', fontWeight: 'normal', color: '#FFFFFF' }}>
                    {values.hasEmoji}
                  </Typography>
                </Box>
                <Box sx={{ marginTop: '40px', paddingTop: '40px', borderTop: '1px solid #FFFFFF' }}>
                  <Typography variant="h3" sx={{ color: '#FFFFFF' }}>
                    Audience
                  </Typography>
                  <Typography variant="h4" sx={{ marginTop: '8px', color: '#FFFFFF' }}>
                    Description:
                  </Typography>
                  <Typography variant="h4" sx={{ marginTop: '8px', fontWeight: 'normal', color: '#FFFFFF' }}>
                    {values.targetCustomer}
                  </Typography>
                </Box>
                <Box sx={{ marginTop: '40px' }}>
                  <Typography variant="h3" sx={{ color: '#FFFFFF' }}>
                    Age Range:
                  </Typography>
                  <Typography variant="h4" sx={{ marginTop: '8px', fontWeight: 'normal', color: '#FFFFFF' }}>
                    {values.startAge} - {values.endAge}
                  </Typography>
                </Box>
                <Box sx={{ marginTop: '40px' }}>
                  <Typography variant="h3" sx={{ color: '#FFFFFF' }}>
                    Gender:
                  </Typography>
                  <Typography variant="h4" sx={{ marginTop: '8px', fontWeight: 'normal', color: '#FFFFFF' }}>
                    {values.gender}
                  </Typography>
                </Box>
                <Box sx={{ marginTop: '40px' }}>
                  <Typography variant="h3" sx={{ color: '#FFFFFF' }}>
                    Interested in:
                  </Typography>
                  <Box sx={{ marginTop: '16px' }}>
                    {values.detailedTargeting.length > 0 &&
                      values.detailedTargeting.map((item: any, index: number) => (
                        <ListItem key={index} sx={{ display: 'inline-block', marginRight: '8px', width: 'auto', padding: 0 }}>
                          <Chip label={item} sx={{ backgroundColor: '#EDE7F6' }} />
                        </ListItem>
                      ))}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={5}>
              {values.ads.map((ad: any, index: number) => (
                <Card
                  sx={{ marginBottom: '20px', borderBottomRightRadius: '4px', borderBottomLeftRadius: '4px', backgroundColor: '#FAFAFA' }}
                >
                  <CardHeader
                    title={`Ad ${index + 1}`}
                    sx={{ backgroundColor: 'primary.main', '.MuiCardHeader-title': { color: '#FFFFFF' } }}
                  />
                  <CardContent>
                    <Box>
                      <Typography variant="h3">Creative:</Typography>
                      <Typography variant="h4" sx={{ marginTop: '8px', fontWeight: 'normal' }}>
                        {ad.creative}
                      </Typography>
                      {ad.media.length > 0 && (
                        <Box sx={{ display: 'flex', marginTop: '8px' }}>
                          {ad.media.map((media: any) => (
                            <Box sx={{ flexBasis: '125px', marginRight: '12px' }}>
                              <img src={media.link} style={{ display: 'block', width: '100%', height: 'auto' }} />
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginTop: '40px' }}>
                      <Typography variant="h4">Offer or key message</Typography>
                      <Typography variant="h4" sx={{ marginTop: '8px', fontWeight: 'normal' }}>
                        {ad.offerDetail}
                      </Typography>
                    </Box>
                    <Box sx={{ marginTop: '40px' }}>
                      <Typography variant="h4">Call to action</Typography>
                      <Typography variant="h4" sx={{ marginTop: '8px', fontWeight: 'normal' }}>
                        {ad.callToAction}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default Review;
