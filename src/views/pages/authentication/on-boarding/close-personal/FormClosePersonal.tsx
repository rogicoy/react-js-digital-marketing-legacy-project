/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { gridSpacing, expectations, runAds, digitalAds } from 'views/common/constant';
import useAuth from 'hooks/useAuth';

// grapqhl
import { useMutation } from '@apollo/client';
import gql from 'store/account/business/gql';

// amterial ui
import { Divider, Grid, Button, Stack, Checkbox, FormControlLabel, Typography, Radio, Box } from '@material-ui/core';
import LoaderCircle from 'ui-component/LoaderCircle';

type FormData = {
  expectations: string[];
  digitalAdsExp: string;
  doRunningAds: string;
};

const FormClosePersonal: FC = () => {
  const { updateUserOnboard, user } = useAuth();

  // query
  const {
    mutation: { businessProfile }
  } = gql;
  const [updateBusinessProfile] = useMutation<{
    businessProfile: {
      info: string;
      status: number;
      error_message: string;
      data: JSON;
    };
  }>(businessProfile, {
    fetchPolicy: 'network-only'
  });

  const onSubmit = async (values: FormData, { setSubmitting }: FormikHelpers<FormData>) => {
    setSubmitting(true);
    try {
      const { data } = await updateBusinessProfile({
        variables: {
          input: {
            ...values,
            expectations: JSON.stringify(values.expectations)
          }
        }
      });

      if (data?.businessProfile.status === 200) {
        await updateUserOnboard({ step: 'CONNECT', updateMe: true });
      }
    } catch (err) {
      setSubmitting(false);
    }
  };

  const handleGoBack = async () => {
    await updateUserOnboard({ step: 'BUSINESS' });
  };

  const initialValues: FormData = {
    expectations: user?.business?.expectations ? JSON.parse(user?.business?.expectations) : [],
    digitalAdsExp: user?.business?.digitalAdsExp || '',
    doRunningAds: user?.business?.doRunningAds || ''
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formikProps) => {
        const { handleSubmit, handleChange, isSubmitting, values } = formikProps;
        return (
          <form noValidate onSubmit={handleSubmit}>
            <Grid item container xs={12} spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid item container xs={12} spacing={1.5}>
                  <Grid item xs={12} md={12}>
                    <Typography variant="h4">What are you hoping to get out of REMOVED?</Typography>
                  </Grid>
                  {expectations.map((item: string, index: number) => (
                    <Grid item key={index}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.expectations.includes(item)}
                            onChange={handleChange}
                            value={item}
                            name="expectations"
                            color="primary"
                          />
                        }
                        label={item}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item container xs={12} spacing={1.5}>
                  <Grid item xs={12} md={12}>
                    <Stack spacing={1}>
                      <Typography variant="h4">Have you run digital ads before?</Typography>
                      {/* <Typography variant="subtitle1">
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </Typography> */}
                    </Stack>
                  </Grid>
                  {digitalAds.map((item: string, index: number) => (
                    <Grid item xs={12} md={12} key={index}>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={values.digitalAdsExp === item}
                            onChange={handleChange}
                            value={item}
                            name="digitalAdsExp"
                            color="primary"
                          />
                        }
                        label={item}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid item container xs={12} spacing={1.5}>
                  <Grid item xs={12} md={12}>
                    <Stack spacing={1}>
                      <Typography variant="h4">If you have run ads for {user?.business?.name} before, how did you do it?</Typography>
                      {/* <Typography variant="subtitle1">
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </Typography> */}
                    </Stack>
                  </Grid>
                  {runAds.map((item: string, index: number) => (
                    <Grid item xs={12} md={12} key={index}>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={values.doRunningAds === item}
                            onChange={handleChange}
                            value={item}
                            name="doRunningAds"
                            color="primary"
                          />
                        }
                        label={item}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={2} sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Button variant="text" onClick={() => handleGoBack()}>
                    Back
                  </Button>

                  <Button type="submit" variant="contained" disabled={isSubmitting}>
                    Next
                  </Button>
                </Stack>
              </Grid>
            </Grid>

            {isSubmitting && (
              <Box>
                <LoaderCircle />
              </Box>
            )}
          </form>
        );
      }}
    </Formik>
  );
};

export default FormClosePersonal;
