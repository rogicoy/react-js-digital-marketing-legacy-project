/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery,
  Theme,
  Autocomplete
} from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';

// project imports
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { industries, referrals } from 'views/common/constant';
import { OnboardingRegisterFormData } from '../types';

const industryOptions = industries;

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  redButton: {
    fontSize: '1rem',
    fontWeight: 500,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
    border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100],
    color: theme.palette.grey[700],
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.primary.light
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem'
    }
  },
  signDivider: {
    flexGrow: 1
  },
  signText: {
    cursor: 'unset',
    margin: theme.spacing(2),
    padding: '5px 56px',
    borderColor: theme.palette.mode === 'dark' ? `${theme.palette.dark.light + 20} !important` : `${theme.palette.grey[100]} !important`,
    color: `${theme.palette.grey[900]}!important`,
    fontWeight: 500
  },
  loginIcon: {
    marginRight: '16px',
    [theme.breakpoints.down('sm')]: {
      marginRight: '8px'
    }
  },
  loginInput: {
    ...theme.typography.customInput
  },
  autoCompleteInput: {
    // needed to use
    padding: '0px !important'
  }
}));

const FormRegister = ({ ...others }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [showPassword, setShowPassword] = useState(false);

  const { login, signup, updateUserOnboard } = useAuth();

  const initialValues: OnboardingRegisterFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    aboutRemoved: '',
    industry: ''
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const onSubmit = async (values: OnboardingRegisterFormData, { setStatus, setSubmitting }: FormikHelpers<OnboardingRegisterFormData>) => {
    try {
      const payload: OnboardingRegisterFormData = { ...values };

      await signup(payload);
      await login(values.email, values.password);
      await updateUserOnboard({ step: 'CHOOSE' });

      if (scriptedRef.current) {
        setStatus({ success: true });
        setSubmitting(false);
        // navigate('/dashboard');
        navigate('/onboarding');
      }
    } catch (err: any) {
      // console.error(err);
      if (scriptedRef.current) {
        setStatus({ success: false });
        setSubmitting(false);
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={onSubmit}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <Grid container spacing={matchDownSM ? 0 : 2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                margin="normal"
                name="firstName"
                type="text"
                className={classes.loginInput}
                value={values.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                margin="normal"
                name="lastName"
                type="text"
                className={classes.loginInput}
                value={values.lastName}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <FormControl fullWidth error={Boolean(touched.email && errors.email)} className={classes.loginInput}>
            <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email-register"
              type="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              inputProps={{}}
            />
            {touched.email && errors.email && (
              <FormHelperText error id="standard-weight-helper-text--register">
                {errors.email}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth error={Boolean(touched.password && errors.password)} className={classes.loginInput}>
            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-register"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
              label="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{}}
            />
            {touched.password && errors.password && (
              <FormHelperText error id="standard-weight-helper-text-password-register">
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>

          <Grid container>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                disableClearable
                options={referrals}
                value={values.aboutRemoved}
                onBlur={handleBlur}
                onChange={(event, value) => {
                  setFieldValue('aboutRemoved', value);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="How did you hear about us?" fullWidth className={classes.loginInput} />
                )}
                sx={{ padding: 0 }}
                classes={{
                  inputRoot: classes.autoCompleteInput
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Autocomplete
                disableClearable
                options={industryOptions}
                value={values.industry}
                onBlur={handleBlur}
                onChange={(event, value) => {
                  setFieldValue('industry', value);
                }}
                renderInput={(params) => <TextField {...params} label="Industry" fullWidth className={classes.loginInput} />}
                sx={{ padding: 0 }}
                classes={{
                  inputRoot: classes.autoCompleteInput
                }}
              />
            </Grid>
          </Grid>

          <Grid container alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <Grid item>
              <Typography variant="subtitle2" color="#000000">
                Set your sights for success! Let REMOVED take the heavy lifting out of your digital marketing strategy by registering your
                account today.
              </Typography>
            </Grid>
          </Grid>

          <Box
            sx={{
              mt: 5,
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <AnimateButton>
              <Button disableElevation disabled={isSubmitting} size="large" type="submit" variant="contained" color="secondary">
                Register
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default FormRegister;
