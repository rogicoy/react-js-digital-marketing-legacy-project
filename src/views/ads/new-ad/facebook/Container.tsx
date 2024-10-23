/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { forwardRef, useEffect, useRef, useState } from 'react';

// material-ui imports
import { Dialog, AppBar, Toolbar, Typography, SlideProps, Slide, IconButton, Grid, DialogContent, Box, Button } from '@material-ui/core';

// material-ui icon imports
import CloseIcon from '@material-ui/icons/Close';

// third-party imports
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// project imports
import { FaceBookCampaignProps } from './types';
import MultiStepForm from 'ui-component/multi-step-form/MultiStepForm';
import MultiStepFormItem from 'ui-component/multi-step-form/MultiStepFormItem';
import ObjectiveForm from './ObjectiveForm';
import CampaignDetails from './CampaignDetails';
import BudgetAndDuration from './BudgetAndDuration';
import Audience from './Audience';
import CreateAudience from './CreateAudience';
import Creative from './Creative';
import AddForm from './AddForm';
import ReviewAd from './ReviewAd';
import CampaignBrief from './CampaignBrief';
import Ads from './Ads';
import gql from 'store/ads/new-ad/gql';
import Review from './Review';
import { useMutation } from '@apollo/client';
import AdBriefSuccessImage from 'assets/images/pages/ad-brief-success.svg';

const Transition = forwardRef((slideProps: SlideProps, ref) => <Slide direction="up" ref={ref} {...slideProps} />);

const Container = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [formStep, setFormStep] = useState(0);
  const [facebookCampaignId, setFacebookCampaignId] = useState('');
  const [adBriefSuccessDialogOpen, setAdBriefSuccessDialogOpen] = useState<boolean>(false);
  const facebookCampaign = useSelector((state: any) => state.ads.newAd.facebookCampaign);
  const dialog = useRef();
  const [createAdBrief, { loading: createAdBriefLoading }] = useMutation(gql.mutation.createFacebookAdBrief, {
    fetchPolicy: 'network-only'
  });
  const [createAdBriefAudience, { loading: createAdBriefAudienceLoading }] = useMutation(gql.mutation.createFacebookAdBriefAudience, {
    fetchPolicy: 'network-only'
  });
  const [createAdBriefAds, { loading: createAdBriefAdsLoading }] = useMutation(gql.mutation.createFacebookAdBriefAds, {
    fetchPolicy: 'network-only'
  });

  const initialValues = {
    campaignName: '',
    objective: 'Lead Generation',
    budgetAmount: 0,
    budgetType: 'Per day',
    startDate: new Date(),
    isEndDateEnabled: false,
    endDate: '',
    toneOfVoice: {
      excited: false,
      casual: false,
      formal: false,
      playful: false
    },
    toneOfVoiceOther: '',
    hasEmoji: 'Yes',
    location: '',
    range: 5,
    startAge: 18,
    endAge: '65+',
    gender: 'All',
    detailedTargeting: [],
    targetCustomer: '',
    ads: [
      {
        creative: 'Single',
        media: [],
        offer: 'Yes',
        offerDetail: '',
        callToAction: 'Sign up'
      }
    ]
  };

  const handleCurrentStep = async (step: any) => {
    setFormStep(step);
  };

  const handleClose = () => {
    setIsOpen(false);
    navigate('/ads/create');
  };

  const handleAdBriefSuccessDialogClose = () => {
    navigate('/ads/create');
  };

  useEffect(() => {
    if (facebookCampaign.id) {
      navigate(`/ads/create/facebook/${facebookCampaign.id}`);
    }
  }, [facebookCampaign]);

  return (
    <Dialog fullScreen open={isOpen} onClose={handleClose} TransitionComponent={Transition}>
      <DialogContent ref={dialog} sx={{ padding: 0 }}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h2" color="inherit">
              Facebook Ad
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container sx={{ maxWidth: '1200px', margin: '0 auto', padding: '50px' }}>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              const {
                campaignName,
                objective,
                budgetAmount,
                budgetType,
                startDate,
                endDate,
                toneOfVoice,
                hasEmoji,
                location,
                range,
                startAge,
                endAge,
                gender,
                detailedTargeting,
                targetCustomer,
                ads
              } = values;

              const budgetTypes: any = {
                'Per day': 'DAILY',
                'Per week': 'WEEKLY',
                'Per month': 'MONTHLY'
              };

              const convertToBoolean: any = {
                Yes: true,
                No: false
              };

              const mappedAds = ads.map((ad) => ({
                adName: 'Test',
                mediaIds: ad.media.map((item: any) => item.id),
                offer: ad.offer,
                callToAction: ad.callToAction
              }));

              const facebookAdBriefResponse = await createAdBrief({
                variables: {
                  input: {
                    campaignName,
                    objective,
                    budget: Number(budgetAmount),
                    budgetType: budgetTypes[budgetType],
                    startAt: startDate,
                    ...(endDate !== '' && { endAt: endDate }),
                    toneOfVoice,
                    hasEmoji: convertToBoolean[hasEmoji],
                    status: 'PENDING'
                  }
                }
              });
              const facebookAdBriefId = facebookAdBriefResponse.data.facebookAdBrief.info;
              console.log(facebookAdBriefId);
              const facebookAdBriefAudienceResponse = await createAdBriefAudience({
                variables: {
                  input: {
                    facebookAdBriefId,
                    location,
                    radius: range,
                    ageFrom: String(startAge),
                    ageTo: endAge,
                    gender,
                    detailedTargeting,
                    otherDetails: targetCustomer
                  }
                }
              });
              console.log(facebookAdBriefAudienceResponse);
              const facebookAdBriefAdsResponse = await createAdBriefAds({
                variables: {
                  input: {
                    facebookAdBriefId,
                    facebookAdBriefAds: mappedAds
                  }
                }
              });
              console.log(facebookAdBriefAdsResponse);
              setAdBriefSuccessDialogOpen(true);
            }}
          >
            {({ handleSubmit, handleChange, handleBlur, setFieldValue, touched, values, errors }) => (
              <MultiStepForm
                id="new-add-facebook"
                onSubmit={handleSubmit}
                currentStep={handleCurrentStep}
                parent={dialog}
                loading={createAdBriefLoading || createAdBriefAudienceLoading || createAdBriefAdsLoading}
              >
                <MultiStepFormItem>
                  <CampaignBrief
                    touched={touched}
                    errors={errors}
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                </MultiStepFormItem>
                <MultiStepFormItem>
                  <Audience
                    touched={touched}
                    errors={errors}
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                </MultiStepFormItem>
                <MultiStepFormItem>
                  <Ads
                    touched={touched}
                    errors={errors}
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                </MultiStepFormItem>
                <MultiStepFormItem>
                  <Review
                    touched={touched}
                    errors={errors}
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                </MultiStepFormItem>

                {/* <MultiStepFormItem>
                  <CampaignDetails touched={touched} errors={errors} values={values} handleBlur={handleBlur} handleChange={handleChange} />
                </MultiStepFormItem>
                <MultiStepFormItem>
                  <ObjectiveForm />
                </MultiStepFormItem>
                <MultiStepFormItem>
                  <BudgetAndDuration
                    touched={touched}
                    errors={errors}
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                </MultiStepFormItem>
                <MultiStepFormItem>
                  <Audience values={values} />
                </MultiStepFormItem>
                <MultiStepFormItem>
                  <CreateAudience touched={touched} errors={errors} values={values} handleBlur={handleBlur} handleChange={handleChange} />
                </MultiStepFormItem>
                <MultiStepFormItem>
                  <Creative
                    touched={touched}
                    errors={errors}
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                </MultiStepFormItem>
                <MultiStepFormItem>
                  <AddForm touched={touched} errors={errors} values={values} handleBlur={handleBlur} handleChange={handleChange} />
                </MultiStepFormItem>
                <MultiStepFormItem>
                  <ReviewAd touched={touched} errors={errors} values={values} handleBlur={handleBlur} handleChange={handleChange} />
                </MultiStepFormItem> */}
              </MultiStepForm>
            )}
          </Formik>
        </Grid>
      </DialogContent>

      <Dialog open={adBriefSuccessDialogOpen}>
        <Box sx={{ width: '100%', maxWidth: '580px' }}>
          <Box sx={{ width: '100%', height: '122px', background: 'linear-gradient(180deg, #B39DDB 0%, #7F66EB 100%)' }} />
          <Box sx={{ padding: '20px 64px' }}>
            <img src={AdBriefSuccessImage} style={{ display: 'block', width: '217px', height: '217px', margin: '-140px auto 0' }} />
            <Typography variant="h2" align="center">
              Hooray! Your Facebook Campaign Brief has been created.
            </Typography>
            <Typography align="center" sx={{ marginTop: '28px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '0px 40px 8px' }}>
            <Button variant="text" onClick={handleAdBriefSuccessDialogClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Dialog>
  );
};

export default Container;
