/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';
import { Link } from 'react-router-dom';

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
  Typography,
  Theme
} from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  loginInput: {
    ...theme.typography.customInput
  },
  textFields: {
    '& fieldset': {
      borderColor: '#8E31F3'
    },
    '&:hover fieldset': {
      borderColor: '#8E31F3'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#8E31F3'
    }
  }
}));

// ===============================|| JWT LOGIN ||=============================== //

const GqlLogin = (props: { login?: string }, { ...others }) => {
  const classes = useStyles();

  const { login } = useAuth();
  const scriptedRef = useScriptRef();

  const [checked, setChecked] = React.useState(true);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault()!;
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await login(values.email, values.password);
        } catch (err: any) {
          console.error(err);
          if (scriptedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <FormControl fullWidth error={Boolean(touched.email && errors.email)} className={classes.loginInput}>
            <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email-login"
              type="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              inputProps={{}}
              classes={{
                root: classes.textFields
              }}
            />
            {touched.email && errors.email && (
              <FormHelperText error id="standard-weight-helper-text-email-login">
                {' '}
                {errors.email}{' '}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth error={Boolean(touched.password && errors.password)} className={classes.loginInput}>
            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
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
                    {showPassword ? <Visibility sx={{ color: '#8E31F3' }} /> : <VisibilityOff sx={{ color: '#8E31F3' }} />}
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{}}
              label="Password"
              classes={{
                root: classes.textFields
              }}
            />
            {touched.password && errors.password && (
              <FormHelperText error id="standard-weight-helper-text-password-login">
                {' '}
                {errors.password}{' '}
              </FormHelperText>
            )}
          </FormControl>

          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    sx={{
                      color: '#8E31F3',
                      '&.Mui-checked': {
                        color: '#8E31F3'
                      }
                    }}
                  />
                }
                label="Keep me logged in"
              />
            </Grid>
            <Grid item>
              <Typography component={Link} to="/forgot-password" color="secondary" sx={{ color: '#8E31F3', textDecoration: 'none' }}>
                Forgot Password?
              </Typography>
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
              <Button
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{ borderRadius: '8px', boxShadow: 'none', backgroundColor: '#8E31F3' }}
              >
                Continue &#8594;
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default GqlLogin;
