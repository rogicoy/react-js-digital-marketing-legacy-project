/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
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
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { StringColorProps } from 'types';
import { referrals } from 'views/common/constant';
import { RegisterFormData } from './types';

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

const GqlRegister = ({ ...others }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [showPassword, setShowPassword] = React.useState(false);
  const [checked, setChecked] = React.useState(true);

  const [strength, setStrength] = React.useState(0);
  const [level, setLevel] = React.useState<StringColorProps>();

  const { login, signup } = useAuth();

  const initialValues: RegisterFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    submit: null,
    referral: ''
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const onSubmit = async (values: RegisterFormData, { setErrors, setStatus, setSubmitting }: FormikHelpers<RegisterFormData>) => {
    try {
      const payload = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password
      };

      await signup(payload);
      await login(values.email, values.password);

      if (scriptedRef.current) {
        setStatus({ success: true });
        setSubmitting(false);
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error(err);
      if (scriptedRef.current) {
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);
      }
    }
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

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
              onChange={(e) => {
                handleChange(e);
                changePassword(e.target.value);
              }}
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

          {strength !== 0 && (
            <FormControl fullWidth>
              <Box
                sx={{
                  mb: 2
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Box
                      style={{ backgroundColor: level?.color }}
                      sx={{
                        width: 85,
                        height: 8,
                        borderRadius: '7px'
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" fontSize="0.75rem">
                      {level?.label}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </FormControl>
          )}

          <Grid container>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                disableClearable
                options={referrals}
                value={values.referral}
                onBlur={handleBlur}
                onChange={(event, value) => {
                  setFieldValue('referral', value);
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
          </Grid>

          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label={
                  <Typography variant="subtitle1">
                    Agree with &nbsp;
                    <Typography variant="subtitle1" component={Link} to="#">
                      Terms & Condition.
                    </Typography>
                  </Typography>
                }
              />
            </Grid>
          </Grid>
          {errors.submit && (
            <Box
              sx={{
                mt: 3
              }}
            >
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}

          <Box
            sx={{
              mt: 2
            }}
          >
            <AnimateButton>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                Sign up
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default GqlRegister;
