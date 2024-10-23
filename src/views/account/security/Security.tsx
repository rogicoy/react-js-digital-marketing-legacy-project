/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Alert, AlertTitle, Button, Grid, Stack, TextField, Typography } from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// grapqhl
import { useMutation } from '@apollo/client';
import gql from 'store/account/security/gql';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'views/common/constant';

const Security = () => {
  const theme = useTheme();

  const [deactivateAccount, { data: deactivateAccountData, loading: deactivateAccountLoading }] = useMutation<{
    deactivateAccount: {
      info: string;
      status: number;
      error_message: string;
      data: JSON;
    };
  }>(gql.mutation.deactivateAccount, {
    fetchPolicy: 'network-only'
  });

  const [changePassword, { data: changePasswordData, loading: changePasswordLoading }] = useMutation<{
    changePassword: {
      info: string;
      status: number;
      error_message: string;
      data: JSON;
    };
  }>(gql.mutation.changePassword, {
    fetchPolicy: 'network-only'
  });

  const handleDeactivateAccount = () => {
    deactivateAccount();
  };

  return (
    <Formik
      initialValues={{
        oldPassword: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        oldPassword: Yup.string().required('Current password is required'),
        password: Yup.string().required('New password is required'),
        confirmPassword: Yup.string()
          .required('Confirm password is required')
          .when('password', {
            is: (val: string) => !!(val && val.length > 0),
            then: Yup.string().oneOf([Yup.ref('password')], 'Both Password must be match!')
          })
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        try {
          const { data } = await changePassword({
            variables: { oldPassword: values.oldPassword, newPassword: values.password }
          });

          if (data && data.changePassword.status === 200) resetForm();
        } catch (err: any) {
          console.error(err);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={gridSpacing}>
            <Grid item sm={6} md={8}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                  <SubCard title="Change Password">
                    <Grid container spacing={gridSpacing}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          type="password"
                          label="Current password"
                          name="oldPassword"
                          value={values.oldPassword}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={Boolean(touched.oldPassword && errors.oldPassword)}
                          helperText={touched.oldPassword && errors.oldPassword}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          type="password"
                          label="New Password"
                          name="password"
                          value={values.password}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={Boolean(touched.password && errors.password)}
                          helperText={touched.password && errors.password}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          type="password"
                          label="Re-enter New Password"
                          name="confirmPassword"
                          value={values.confirmPassword}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                          helperText={touched.confirmPassword && errors.confirmPassword}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction="row">
                          <AnimateButton>
                            <Button type="submit" disabled={changePasswordLoading} variant="contained">
                              Change Password
                            </Button>
                          </AnimateButton>
                        </Stack>
                      </Grid>
                      {(changePasswordData?.changePassword?.error_message || changePasswordData?.changePassword?.info) && (
                        <Grid item xs={12}>
                          {changePasswordData?.changePassword?.error_message ? (
                            <Alert severity="error">
                              <AlertTitle>Error</AlertTitle>
                              {changePasswordData?.changePassword?.error_message}
                            </Alert>
                          ) : (
                            <Alert severity="success">
                              <AlertTitle>Success</AlertTitle>
                              {changePasswordData?.changePassword?.info}
                            </Alert>
                          )}
                        </Grid>
                      )}
                    </Grid>
                  </SubCard>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={6} md={4}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                  <SubCard title="Delete Account">
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="body1">
                          To deactivate your account, first delete its resources. If you are the only owner of any teams, either assign
                          another owner or deactivate the team.
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction="row">
                          <AnimateButton>
                            <Button
                              sx={{
                                color: theme.palette.error.main,
                                borderColor: theme.palette.error.main,
                                '&:hover': {
                                  background: theme.palette.error.light + 25,
                                  borderColor: theme.palette.error.main
                                }
                              }}
                              variant="outlined"
                              size="small"
                              disabled={deactivateAccountLoading}
                              onClick={handleDeactivateAccount}
                            >
                              Deactivate Account
                            </Button>
                          </AnimateButton>
                        </Stack>
                      </Grid>
                      {(deactivateAccountData?.deactivateAccount?.error_message ||
                        deactivateAccountData?.deactivateAccount?.status === 200) && (
                        <Grid item xs={12}>
                          {deactivateAccountData?.deactivateAccount?.error_message ? (
                            <Alert severity="error">
                              <AlertTitle>Error</AlertTitle>
                              {deactivateAccountData?.deactivateAccount?.error_message}
                            </Alert>
                          ) : (
                            <Alert severity="success">
                              <AlertTitle>Success</AlertTitle>
                              Account successfully deactivated.
                            </Alert>
                          )}
                        </Grid>
                      )}
                    </Grid>
                  </SubCard>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default Security;
