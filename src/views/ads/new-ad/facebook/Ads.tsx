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
  Select
} from '@material-ui/core';
import MainCardCustom from 'ui-component/cards/MainCardCustom';
import { LocalizationProvider } from '@material-ui/lab';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import AlertCircleIcon from 'assets/images/icons/alert-circle.svg';
import { Field } from 'formik';
import { SelectMediaFile } from 'store/select-media/main/models';
import SelectMedia from 'views/select-media';

const useStyles = makeStyles((theme: Theme) => ({
  banner: {
    padding: '20px',
    background: 'linear-gradient(180deg, #7F66EB 0%, #9618F7 100%);'
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

const Ads = ({ handleBlur, handleChange, setFieldValue, touched, errors, values }: any) => {
  const classes = useStyles();
  const [openContentManager, setOpenContentManager] = useState<boolean>(false);
  const [adIndex, setAdIndex] = useState(0);
  const callToActionItems = ['Sign up', 'Subscribe', 'Apply now', 'Book now', 'Download', 'Get offer', 'Get quote', 'Learn more'];

  const handleSelectMedia = (index: number) => {
    setAdIndex(index);
    setOpenContentManager(true);
  };

  const handleInsertMedia = (file: SelectMediaFile) => {
    if (Array.isArray(file)) {
      setFieldValue(`ads[${adIndex}].media`, file);
    } else {
      setFieldValue(`ads[${adIndex}].media`, [file]);
    }
    setOpenContentManager(false);
  };

  const handleCreateAd = () => {
    setFieldValue('ads', [
      ...values.ads,
      {
        creative: 'Single',
        media: [],
        offer: 'Yes',
        offerDetail: '',
        callToAction: 'Sign up'
      }
    ]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ margin: '40px auto 0', width: '100%', maxWidth: '700px' }}>
        <Typography variant="h1" align="center">
          Ads
        </Typography>
        <Box sx={{ marginTop: '80px' }}>
          <Card className={classes.banner}>
            <Stack direction="row" spacing={2} width="100%">
              <Box>
                <img src={AlertCircleIcon} width={25} height={25} />
              </Box>
              <Box>
                <Typography className={classes.bannerTitle}>Ads and Campaigns</Typography>
                <Typography className={classes.bannerText}>
                  A single campaign can include multiple ads. Each ad has it’s own image, copy, call to action and goal, and the number of
                  ads you include in each campaign depends mainly on your budget.
                  <br />
                  <br />
                  For monthly budgets under $300 we recommend running one ad.
                  <br />
                  For monthly budgets between $300 - $500 we recommend running
                  <br />
                  two ads. For budgets over $500 talk with your Account Manager.
                </Typography>
              </Box>
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
              <Button className={classes.bannerButton} size="small">
                Learn more
              </Button>
            </Box>
          </Card>
          {values.ads.map((ad: any, index: number) => (
            <Card sx={{ marginTop: '60px', borderBottomRightRadius: '4px', borderBottomLeftRadius: '4px', backgroundColor: '#FAFAFA' }}>
              <CardHeader
                title={`Ad ${index + 1}`}
                sx={{ backgroundColor: 'primary.main', '.MuiCardHeader-title': { color: '#FFFFFF' } }}
              />
              <CardContent>
                <Box>
                  <Typography variant="h4">Creative</Typography>
                  <Typography sx={{ marginTop: '8px' }}>Choose the images or video you would like to use to for this ad</Typography>
                  <Stack direction="row" spacing={1}>
                    <Field
                      type="radio"
                      name={`ads[${index}].creative`}
                      value="Single"
                      render={({ field }: any) => <FormControlLabel label="Single image or video" control={<Radio />} {...field} />}
                    />
                    <Field
                      type="radio"
                      name={`ads[${index}].creative`}
                      value="Carousel"
                      render={({ field }: any) => <FormControlLabel label="Carousel" control={<Radio />} {...field} />}
                    />
                  </Stack>
                  {values.ads[index].media.length > 0 && (
                    <Box sx={{ display: 'flex', marginTop: '8px' }}>
                      {values.ads[index].media.map((media: any) => (
                        <Box sx={{ flexBasis: '125px', marginRight: '12px' }}>
                          <img src={media.link} style={{ display: 'block', width: '100%', height: 'auto' }} />
                        </Box>
                      ))}
                    </Box>
                  )}
                  <Button variant="contained" sx={{ marginTop: '8px' }} onClick={() => handleSelectMedia(index)}>
                    Select
                  </Button>
                </Box>
                <Box sx={{ marginTop: '60px' }}>
                  <Typography variant="h4">Offer or Key Message</Typography>
                  <Typography sx={{ marginTop: '8px' }}>
                    What is the key message of your ad? Do you want to include an offer? Do you want to include an offer?
                  </Typography>
                  {/* <Stack direction="row" spacing={1}>
                    <Field
                      type="radio"
                      name={`ads[${index}].offer`}
                      value="Yes"
                      render={({ field }: any) => <FormControlLabel label="Yes" control={<Radio />} {...field} />}
                    />
                    <Field
                      type="radio"
                      name={`ads[${index}].offer`}
                      value="No"
                      render={({ field }: any) => <FormControlLabel label="No" control={<Radio />} {...field} />}
                    />
                  </Stack> */}
                  <Box sx={{ marginTop: '20px' }}>
                    <Typography>Provide detail of your offer.</Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      name={`ads[${index}].offerDetail`}
                      value={values.ads[index].offerDetail}
                      onChange={handleChange}
                      sx={{ marginTop: '8px' }}
                    />
                  </Box>
                </Box>
                <Box sx={{ marginTop: '60px' }}>
                  <Typography variant="h4">Call to action</Typography>
                  <Typography sx={{ marginTop: '8px' }}>
                    For the offer, the call to action should encourage the user to take action. Shop Now, Sign up ect. are great examples.
                  </Typography>
                  <FormControl fullWidth sx={{ marginTop: '8px' }}>
                    <Field name={`ads[${index}].callToAction`} type="select" as={Select} value={values.ads[index].callToAction}>
                      {callToActionItems.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </Box>
              </CardContent>
            </Card>
          ))}
          {values.ads.length < 3 && (
            <Button fullWidth variant="outlined" sx={{ marginTop: '20px', borderRadius: '4px' }} onClick={handleCreateAd}>
              Create another ad in this campaign
            </Button>
          )}
        </Box>
      </Box>
      <SelectMedia
        open={openContentManager}
        onClose={() => setOpenContentManager(false)}
        onInsertMedia={(file) => file && handleInsertMedia(file)}
        isMultiple={values.ads[adIndex].creative === 'Carousel'}
      />
    </LocalizationProvider>
  );
};

export default Ads;
