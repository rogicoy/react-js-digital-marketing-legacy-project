/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useEffect, useMemo, FC } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { gridSpacing } from 'views/common/constant';
import { IPlanSteps } from './PlanPayment';
import { IStripePlans } from '../../interface';

// material ui
import { makeStyles } from '@material-ui/styles';
import { Box, Button, Grid, Stack, Typography, Skeleton, Theme } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

// graphql
import { useLazyQuery } from '@apollo/client';
import gql from 'store/account/profile/gql';

import CheckMarkSvg from 'assets/images/etc/check-mark.svg';
import CheckMarkWhiteSvg from 'assets/images/etc/check-mark-white.svg';

type FormData = {
  planId: string;
  planName: string;
  plan: IStripePlans | null;
};

interface IStripeBox {
  planId: string;
  planName: string;
  planPrice: number;
  planStars: string;
  planBullets: string[];
  plan: IStripePlans;
  isDefault: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  planBox: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #dddddd',
    borderRadius: '5px',
    maxWidth: '500px',
    height: '100%',
    '&:hover': {
      background: '#F5EBFF'
    }
  }
}));

const FormChoosePlan: FC<IPlanSteps> = ({ type, setStep, setPlan }) => {
  const classes = useStyles();
  /**
   * gql
   */
  const {
    query: { stripePlanList }
  } = gql;

  const [fetchPlans, { data, loading }] = useLazyQuery<{
    stripePlanList: IStripePlans[];
  }>(stripePlanList, { fetchPolicy: 'cache-and-network' });
  const stripePlans = data?.stripePlanList;

  useEffect(() => {
    fetchPlans({
      variables: {
        type
      }
    });
  }, [fetchPlans, type]);

  /**
   *
   * @param values on submuit
   * @param param1
   */
  const onSubmit = async (values: FormData) => {
    if (values.plan !== null) {
      setPlan(values.plan);
      setStep(2);
    }
  };

  const initialValues: FormData = {
    planId: '',
    planName: '',
    plan: null
  };

  // set the default
  const memoStripeBox = useMemo(() => {
    const stripeBox: IStripeBox[] = [];

    if (stripePlans) {
      stripePlans.forEach((item: IStripePlans) => {
        let star;
        let isDefault = false;
        const bullets: string[] = [];
        const planId = item.prices[0]?.id;

        Object.entries(item.metadata)?.forEach((metaItem: any) => {
          if (metaItem[0] === 'stars') {
            // eslint-disable-next-line prefer-destructuring
            star = metaItem[1];
          } else if (metaItem[0] === 'is_default') {
            isDefault = true;
          } else {
            bullets.push(metaItem[1]);
          }
        });

        stripeBox.push({
          planId,
          planName: item.name,
          planPrice: item.prices[0].amount || 0,
          planBullets: bullets,
          planStars: star || '',
          plan: item,
          isDefault
        });
      });
    }

    return stripeBox;
  }, [stripePlans]);

  if (loading)
    return (
      <Grid item container xs={12} spacing={gridSpacing}>
        <Grid item md={4}>
          <Skeleton variant="rectangular" animation="wave" sx={{ height: '420px', width: '100%' }} />
        </Grid>
        <Grid item md={4}>
          <Skeleton variant="rectangular" animation="wave" sx={{ height: '420px', width: '100%' }} />
        </Grid>
        <Grid item md={4}>
          <Skeleton variant="rectangular" animation="wave" sx={{ height: '420px', width: '100%' }} />
        </Grid>
        <Grid item md={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Skeleton variant="rectangular" animation="wave" sx={{ height: '50px', width: '200px' }} />
          </Box>
        </Grid>
      </Grid>
    );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        planId: Yup.string().max(255).required('Please choose a plan')
      })}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, setFieldValue, isSubmitting, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid item container xs={12} spacing={gridSpacing}>
            {memoStripeBox
              ?.sort((a: IStripeBox, b: IStripeBox) => +a.planStars - +b.planStars)
              .map((item: IStripeBox, index: number) => {
                const hasValue: boolean = values.planId !== '';
                const plan = item.planId === values.planId;

                if (!hasValue && item.isDefault) {
                  setFieldValue('planId', item.planId);
                  setFieldValue('planName', item.planName);
                  setFieldValue('plan', item.plan);
                }

                return (
                  <Grid item key={index} md={4}>
                    <Box
                      className={classes.planBox}
                      sx={{
                        background: plan ? '#8E31F3 !important' : '#ffffff'
                      }}
                    >
                      <Stack sx={{ p: 2 }} spacing={1.5}>
                        <Typography
                          variant="h3"
                          component="div"
                          sx={{ fontWeight: '600', color: plan ? '#ffffff' : '#000000', py: 3, fontSize: '22px', textAlign: 'center' }}
                        >
                          {item.planName}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Box>
                            <Typography
                              variant="caption"
                              component="div"
                              sx={{ fontWeight: '500', color: plan ? '#ffffff' : '#000000', fontSize: '39px' }}
                            >
                              $
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="h1"
                              component="div"
                              sx={{ fontWeight: '500', color: plan ? '#ffffff' : '#000000', fontSize: '78px', position: 'relative' }}
                            >
                              {`${item.planPrice}`}
                            </Typography>
                          </Box>

                          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                            <Typography variant="caption" component="span" sx={{ color: '#757575' }}>
                              {[...Array(+item.planStars)].map((st: string, si: number) => (
                                <StarIcon htmlColor="#FFC400" fontSize="small" key={`star-${si}`} />
                              ))}
                            </Typography>
                            <Typography variant="caption" component="span" sx={{ color: plan ? '#ffffff' : '#757575' }}>
                              /Per Month
                            </Typography>
                          </Box>
                        </Box>
                      </Stack>

                      <Stack sx={{ padding: 2 }} spacing={3}>
                        {/* <Typography variant="body2" sx={{ color: '#757575', height: '40px' }}>
                        {item.description}
                      </Typography> */}

                        <Typography component="ul" sx={{ listStyleType: 'none', pl: 0 }}>
                          {item.planBullets.map((bullet: string) => (
                            <Typography
                              variant="body1"
                              component="li"
                              key={bullet}
                              sx={{
                                color: plan ? '#ffffff' : '#000000',
                                mb: 2.5,
                                position: 'relative',
                                pl: '30px',
                                '&:before': {
                                  content: `""`,
                                  position: 'absolute',
                                  top: '2px',
                                  left: 0,
                                  width: '17px',
                                  height: '12px',
                                  color: '#9618f7',
                                  background: `url(${plan ? CheckMarkWhiteSvg : CheckMarkSvg})`
                                }
                              }}
                            >
                              {bullet}
                            </Typography>
                          ))}
                        </Typography>
                      </Stack>

                      <Stack sx={{ padding: 2.5, flex: 1, justifyContent: 'flex-end' }}>
                        <Button
                          type="button"
                          variant={plan ? 'contained' : 'outlined'}
                          onClick={() => {
                            setFieldValue('planId', item.planId);
                            setFieldValue('planName', item.planName);
                            setFieldValue('plan', item.plan);
                          }}
                          sx={{ borderRadius: '10px' }}
                        >
                          {plan ? 'Selected' : 'Choose this plan'}
                        </Button>
                      </Stack>
                    </Box>
                  </Grid>
                );
              })}

            <Grid item md={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="submit" variant="contained" disabled={values.planId === '' || isSubmitting} sx={{ borderRadius: '10px' }}>
                  {values.planId === '' ? 'Please choose your plan' : 'Continue'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default FormChoosePlan;
