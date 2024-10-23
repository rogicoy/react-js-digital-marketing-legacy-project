/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useEffect } from 'react';
import { IFormValues } from '../interface';
import useAuth from 'hooks/useAuth';

// grapqhl
import { useMutation } from '@apollo/client';
import gql from 'store/account/business/gql';

// third party
import { Formik } from 'formik';

// project imports
import { Button, CircularProgress, Grid, Stack } from '@material-ui/core';
import { gridSpacing } from 'views/common/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';
import BusinessDetails from './BusinessDetails';
import Location from './Location';
import Keywords from './Keywords';
import Emails from './Emails';

const Container: FC = () => {
  // state
  // const [open, setOpen] = useState<boolean>(false);

  // auth
  const { user, getMe } = useAuth();

  // query
  const {
    mutation: { businessProfile }
  } = gql;
  const [updateBusinessProfile, { data }] = useMutation<{
    businessProfile: {
      info: string;
      status: number;
      error_message: string;
      data: JSON;
    };
  }>(businessProfile, {
    fetchPolicy: 'network-only'
  });

  const initialValues: IFormValues = {
    name: user?.business?.name || '',
    website: user?.business?.website || '',
    phone: user?.business?.phone || '',
    industries: user?.business?.industries || '',
    tags: user && user?.business && user?.business?.tags ? JSON.parse(user?.business?.tags) : [],
    locations: user && user?.business && user?.business?.locations ? JSON.parse(user?.business?.locations) : '',
    timezone: user?.business?.timezone || '',
    isLeadEnabled: user && user?.business && user?.business?.isLeadEnabled !== null ? user?.business?.isLeadEnabled : false,
    leadEmails: user && user?.business && user?.business?.leadEmails ? JSON.parse(user?.business?.leadEmails) : []
  };

  useEffect(() => {
    if (data?.businessProfile && data?.businessProfile.status === 200) {
      getMe();
    }
  }, [data]);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const { tags, locations, leadEmails } = values;
          await updateBusinessProfile({
            variables: {
              input: {
                ...values,
                website: values.website.trim() === '' ? null : values.website,
                tags: JSON.stringify(tags),
                locations: JSON.stringify(locations),
                leadEmails: JSON.stringify(leadEmails)
              }
            }
          });
          setSubmitting(false);
        }}
      >
        {(formikProps) => (
          <form noValidate style={{ height: '100%' }} onSubmit={formikProps.handleSubmit}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                Your business profile helps our system to target the right audience and optimise your post engagement, Ad impressions and Ad
                clicks.
              </Grid>

              <Grid item xs={6}>
                <BusinessDetails {...formikProps} />
              </Grid>

              <Grid item xs={6}>
                <Location {...formikProps} />
              </Grid>

              <Grid item xs={6}>
                <Keywords {...formikProps} />
              </Grid>

              <Grid item xs={6}>
                <Emails {...formikProps} />
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" justifyContent="end">
                  <AnimateButton>
                    <Button type="submit" sx={{ px: 6 }} variant="contained" disabled={formikProps.isSubmitting}>
                      Save
                      {formikProps.isSubmitting && <CircularProgress sx={{ marginLeft: 1 }} size={20} />}
                    </Button>
                  </AnimateButton>
                </Stack>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Container;
