/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useMemo, useState } from 'react';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';
import { gridSpacing } from 'views/common/constant';
import { isDstObserved } from 'views/common/tools';
// import timezones from 'views/common/timezones';
import timezoneList from 'views/common/timezonelist';
import useAuth from 'hooks/useAuth';

// grapqhl
import { useMutation } from '@apollo/client';
import gql from 'store/account/business/gql';

// material ui
import { Autocomplete, Box, Button, Divider, Grid, Stack, TextField, Typography } from '@material-ui/core';

// components
import MaterialUiPhoneNumber from 'ui-component/material-ui-phone-number';
import LoaderCircle from 'ui-component/LoaderCircle';
import HtmlTooltip from 'ui-component/HtmlTooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

type FormData = {
  name: string;
  website: string;
  phone: string;
  timezone: string;
  abn: string;
};

const businessSchema = Yup.object().shape({
  name: Yup.string().max(255).required('Business name is required'),
  website: Yup.string().matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    'Please enter valid URL'
  ),
  phone: Yup.string().max(255).required('Phone number is required'),
  abn: Yup.string().min(11, 'ABN should be 11 digits number').matches(/^\d+$/, 'ABN should be number only')
});

const FormBusinessDetails: FC = () => {
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

  /**
   * on submit
   * @param values
   * @param param1
   */
  const onSubmit = async (values: FormData, { setSubmitting }: FormikHelpers<FormData>) => {
    setSubmitting(true);
    try {
      const { data } = await updateBusinessProfile({
        variables: {
          input: {
            ...values,
            website: values.website.trim() === '' ? null : values.website
          }
        }
      });

      if (data?.businessProfile.status === 200) {
        await updateUserOnboard({ step: 'CLOSE', updateMe: true });
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
    }
  };

  // const timezoneOptions = useMemo(() => {
  //   const isDst = isDstObserved();
  //   return timezones
  //     .filter((tz) => (isDst ? tz : !tz.isdst))
  //     .map((tz) => ({
  //       label: `${tz.text} - ${tz.value}`,
  //       value: tz.value
  //     }));
  // }, []);

  const timezoneOptions = useMemo(() => {
    const checked = true;
    return timezoneList.map((tz) => ({
      label: tz,
      value: tz
    }));
  }, []);
  const [tz, setTz] = useState(() => timezoneOptions.find((e) => e.value === user?.business?.timezone) || timezoneOptions[0]);

  const handleTimeZone = (formik: FormikProps<FormData>, x: any) => {
    setTz(x);
    const tzValue = timezoneOptions.find((e) => e.value === x.value);
    formik.setFieldValue('timezone', tzValue?.value);
  };

  const initialValues: FormData = {
    name: user?.business?.name || '',
    website: user?.business?.website || '',
    phone: user?.business?.phone || '',
    timezone: user?.business?.timezone || tz.value,
    abn: user?.business?.abn || ''
  };

  return (
    <Formik initialValues={initialValues} validationSchema={businessSchema} onSubmit={onSubmit}>
      {(formikProps) => {
        const { handleSubmit, handleChange, handleBlur, setFieldValue, isSubmitting, values, errors, touched } = formikProps;
        return (
          <form noValidate onSubmit={handleSubmit}>
            <Grid item container xs={12} spacing={gridSpacing}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Business Name"
                  name="name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.name && errors.name}
                  error={Boolean(touched.name && errors.name)}
                  autoComplete="off"
                  inputProps={{ maxLength: 100 }}
                />
              </Grid>

              <Grid item xs={12}>
                <MaterialUiPhoneNumber
                  fullWidth
                  variant="outlined"
                  defaultCountry="au"
                  label="Business Phone Number"
                  name="phone"
                  value={values.phone}
                  isValid={() => true}
                  helperText={touched.phone && errors.phone}
                  error={Boolean(touched.phone && errors.phone)}
                  onChange={(value: string) => {
                    setFieldValue('phone', value);
                  }}
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Website"
                  name="website"
                  value={values.website}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.website && errors.website}
                  error={Boolean(touched.website && errors.website)}
                  autoComplete="off"
                  inputProps={{ maxLength: 50 }}
                />
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  disableClearable
                  autoHighlight
                  options={timezoneOptions}
                  value={tz}
                  onBlur={handleBlur}
                  onChange={(event, value) => {
                    handleTimeZone(formikProps, value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Timezone"
                      helperText={touched.timezone && errors.timezone}
                      error={Boolean(touched.timezone && errors.timezone)}
                      autoComplete="off"
                    />
                  )}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                />
              </Grid>

              <Grid item xs={12}>
                <Stack flexDirection="column" spacing={1.25}>
                  <TextField
                    fullWidth
                    label="ABN"
                    name="abn"
                    value={values.abn}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={touched.abn && errors.abn}
                    error={Boolean(touched.abn && errors.abn)}
                    autoComplete="off"
                    inputProps={{ maxLength: 11 }}
                  />

                  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mb: 1 }}>
                    <Typography variant="caption" color="#000000">
                      Why do we need this?
                    </Typography>
                    <HtmlTooltip
                      title={
                        <div style={{ color: '#616161' }}>
                          By providing your ABN, you are confirming that you are registered for GST and should not be charged GST. You will
                          be charged GST if the ABN that you provide is invalid or incomplete.{' '}
                          <a
                            href="https://removed"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Learn more
                          </a>
                        </div>
                      }
                    >
                      <InfoOutlinedIcon
                        sx={{
                          width: 20,
                          height: 20,
                          cursor: 'pointer'
                        }}
                      />
                    </HtmlTooltip>
                  </Box>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item md={12}>
                <Stack spacing={2} sx={{ justifyContent: 'flex-end' }}>
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

export default FormBusinessDetails;
