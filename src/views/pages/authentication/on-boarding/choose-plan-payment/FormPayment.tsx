/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useMemo } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { countryList, gridSpacing } from 'views/common/constant';
import { IStripePayment } from './PlanPayment';
import useAuth from 'hooks/useAuth';

// material ui
import { Grid, Box, Typography, Stack, Divider, Button, TextField, Autocomplete } from '@material-ui/core';

// graphql
import { useMutation } from '@apollo/client';
import gql from 'store/account/profile/gql';

// components
import LoaderCircle from 'ui-component/LoaderCircle';

// assets
import StripeLogo from 'assets/images/etc/stripe.png';
import { IOptionItem } from 'types';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: IOptionItem;
  zipCode: string;
  planId: string;
  stripeToken: string;
  card?: string;
  promoCode?: string | null;
};

const paymentSchema = Yup.object().shape({
  firstName: Yup.string().max(255).required('Firstname is required'),
  lastName: Yup.string().max(255).required('Lastname is required'),
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  address: Yup.string().max(255).required('Address is required'),
  city: Yup.string().max(255).required('City is required'),
  // country: Yup.string().max(255).required('Country is required'),
  zipCode: Yup.string().max(255).required('Zipcode is required')
});

const FormPayment: FC<IStripePayment> = ({ plan, type }) => {
  const stripe = useStripe();
  const elements = useElements();

  const { user, updateUserOnboard } = useAuth();

  const {
    mutation: { subscribe }
  } = gql;

  const [subscribeUser] = useMutation<{
    subscribe: {
      info: string;
      status: number;
      error_message: string;
      data: JSON;
    };
  }>(subscribe, { fetchPolicy: 'network-only' });

  const onSubmit = async (values: FormData, { setSubmitting, setErrors }: FormikHelpers<FormData>) => {
    setSubmitting(true);

    try {
      if (elements && stripe) {
        const cardElement = elements.getElement(CardElement);

        if (cardElement) {
          const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            billing_details: {
              name: `${values.firstName} ${values.lastName}`,
              email: values.email,
              address: {
                line1: values.address,
                city: values.city,
                country: countryList.find((item: any) => item.value === values.country.value)?.code,
                postal_code: values.zipCode,
                state: values.state
              }
              // phone: null
            },
            card: cardElement
          });

          if (!error) {
            const { data } = await subscribeUser({
              variables: {
                input: {
                  priceId: values.planId,
                  couponId: values.promoCode,
                  paymentMethodId: paymentMethod?.id
                }
              }
            });

            if (data && data.subscribe.status === 200) {
              await updateUserOnboard({ step: 'READY' });
            }
          } else {
            setSubmitting(false);
            setErrors({
              card: error.message
            });
          }
        }
      }
    } catch (err) {
      setSubmitting(false);
    }
  };

  const memoCountryList = useMemo(() => {
    const list: IOptionItem[] = [];
    countryList.forEach((item: any) => {
      list.push({
        label: item.value,
        value: item.value
      });
    });

    return list;
  }, []);

  const initialValues: FormData = {
    firstName: '',
    lastName: '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    // set AU as the default option
    country: memoCountryList.find((item: IOptionItem) => item.value === 'Australia') || memoCountryList[0],
    zipCode: '',
    planId: plan.prices[0].id,
    stripeToken: '',
    promoCode: null
  };

  return (
    <Formik initialValues={initialValues} validationSchema={paymentSchema} onSubmit={onSubmit}>
      {({ handleSubmit, handleBlur, handleChange, errors, touched, setFieldValue, isSubmitting, values, setFieldError }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid item container md={12} spacing={gridSpacing}>
            <Grid item md={12}>
              <Box display="flex" justifyContent="flex-end">
                <img src={StripeLogo} alt="Stripe" />
              </Box>
            </Grid>
            <Grid item md={6}>
              <Stack sx={{ border: '1px solid #dddddd', borderRadius: '5px', maxWidth: '500px', padding: 2 }} spacing={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Typography variant="h3" component="div" sx={{ fontWeight: '600', color: '#000000' }}>
                    {plan.name}
                  </Typography>

                  <Typography variant="h1" component="div" sx={{ fontWeight: '600', color: '#000000' }}>
                    {`$${plan.prices[0].amount}`}
                    <Typography variant="h3" component="span" sx={{ color: '#757575' }}>
                      /pm
                    </Typography>
                  </Typography>
                </Box>

                <Stack spacing={2}>
                  <Typography>Excluding monthly Ad spent Management Fee 10%</Typography>
                  <Typography component="div">
                    <TextField
                      fullWidth
                      label="Promo code"
                      name="promoCode"
                      value={values.promoCode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      helperText={touched.promoCode && errors.promoCode}
                      error={Boolean(touched.promoCode && errors.promoCode)}
                      autoComplete="off"
                    />
                  </Typography>
                </Stack>

                <Stack spacing={2}>
                  <Typography variant="h3" sx={{ fontWeight: '600', color: '#000000' }}>
                    Plan Summary
                  </Typography>
                  <Box>
                    <Typography sx={{ color: '#000000', textTransform: 'capitalize' }} component="div">
                      {type}ly Recurring Subscription:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: '#000000' }} component="span">
                        {plan.name}
                      </Typography>
                      <Typography sx={{ color: '#000000' }} component="span">
                        {`$${plan.prices[0].amount}`}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider />

                  <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: '#000000' }}>Subtotal</Typography>
                    <Typography sx={{ color: '#000000' }}> {`$${plan.prices[0].amount}`}</Typography>
                  </Box>
                </Stack>
              </Stack>
            </Grid>

            <Grid item md={6}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Firstname"
                    name="firstName"
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={touched.firstName && errors.firstName}
                    error={Boolean(touched.firstName && errors.firstName)}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Lastname"
                    name="lastName"
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={touched.lastName && errors.lastName}
                    error={Boolean(touched.lastName && errors.lastName)}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email address"
                    name="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={touched.email && errors.email}
                    error={Boolean(touched.email && errors.email)}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={values.address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={touched.address && errors.address}
                    error={Boolean(touched.address && errors.address)}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={values.city}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={touched.city && errors.city}
                    error={Boolean(touched.city && errors.city)}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={values.state}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={touched.state && errors.state}
                    error={Boolean(touched.state && errors.state)}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={6}>
                  <Autocomplete
                    disableClearable
                    options={memoCountryList}
                    value={values.country}
                    onBlur={handleBlur}
                    onChange={(event, value) => {
                      setFieldValue('country', value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Country"
                        helperText={touched.country && errors.country}
                        error={Boolean(touched.country && errors.country)}
                        autoComplete="off"
                      />
                    )}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Zipcode"
                    name="zipCode"
                    value={values.zipCode}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={touched.zipCode && errors.zipCode}
                    error={Boolean(touched.zipCode && errors.zipCode)}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ background: '#fafafa', border: '1.5px solid #c6c6c6', borderRadius: '12px', width: '100%', p: '14px' }}>
                    <CardElement
                      onChange={(e) => {
                        if (e.error) setFieldError('card', e.error.message);
                        if (e.complete) setFieldError('card', '');
                      }}
                      options={{
                        hidePostalCode: true,
                        style: {
                          base: {
                            fontSize: '16px',
                            fontWeight: '500',
                            color: '#000',
                            '::placeholder': {
                              color: '#B3B3B3'
                            }
                          },
                          invalid: {
                            color: '#9e2146'
                          }
                        }
                      }}
                    />
                  </Box>
                  {errors.card && (
                    <Typography variant="caption" component="div" color="#f14336" mt="5px">
                      {errors.card}
                    </Typography>
                  )}
                </Grid>

                <Grid item md={12}>
                  <Stack spacing={2}>
                    <Typography variant="caption" component="div" color="#000">
                      You hereby authorise REMOVED to charge you automatically every month until you cancel your subscription. You can view
                      and cancel your subscription at any time by accessing your Billing & Payments page.
                    </Typography>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                      Pay Now
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {isSubmitting && (
            <Box>
              <LoaderCircle />
            </Box>
          )}
        </form>
      )}
    </Formik>
  );
};

export default FormPayment;
