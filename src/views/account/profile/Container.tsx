/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Alert, AlertTitle, Avatar, Button, Grid, Stack, TextField, Theme, Typography } from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'views/common/constant';
import useAuth from 'hooks/useAuth';

// assets
import { useMutation } from '@apollo/client';
import gql from 'store/account/profile/gql';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  accountAvatar: {
    width: '100px',
    height: '100px',
    margin: '0 auto'
  },
  accountContent: {
    textAlign: 'center'
  }
}));

const Container = () => {
  const classes = useStyles();
  const { user, getMe } = useAuth();
  const [updateProfile, { data: updatedData, loading }] = useMutation<{
    updateProfile: {
      info: string;
      status: number;
      error_message: string;
      data: JSON;
    };
  }>(gql.mutation.updateProfile);

  const initialValues = {
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    email: user?.email ?? '',
    avatar: user?.avatar as any
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().max(255).required('Firstname is required'),
        lastName: Yup.string().max(255).required('Lastname is required'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
      })}
      onSubmit={async (values) => {
        try {
          const newValues = { ...values };
          if (typeof newValues.avatar === 'string') {
            delete newValues.avatar;
          }

          const { data } = await updateProfile({
            variables: { input: newValues }
          });

          if (data && data.updateProfile.status === 200) {
            getMe();
          }
        } catch (err) {
          console.log(err);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={gridSpacing}>
            <Grid item sm={6} md={4}>
              <SubCard title="Profile Picture" contentClass={classes.accountContent}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Avatar
                      alt="avatar"
                      src={values.avatar instanceof File ? URL.createObjectURL(values.avatar) : values.avatar}
                      className={classes.accountAvatar}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" align="center">
                      Upload/Change Your Profile Image
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <AnimateButton>
                      <Button variant="contained" size="small" component="label">
                        Upload Avatar
                        <input
                          accept="image/*"
                          type="file"
                          hidden
                          multiple={false}
                          name="avatar"
                          onChange={(evt) => {
                            if (evt.target.files?.[0]) {
                              setFieldValue('avatar', evt.target.files[0]);
                            }
                          }}
                        />
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>
            <Grid item sm={6} md={8}>
              <SubCard title="Edit Account Details">
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
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(touched.email && errors.email)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction="row">
                      <AnimateButton>
                        <Button disabled={loading} type="submit" variant="contained">
                          Change Details
                        </Button>
                      </AnimateButton>
                    </Stack>
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>

            {(updatedData?.updateProfile?.error_message || updatedData?.updateProfile?.info) && (
              <Grid item xs={12}>
                {updatedData?.updateProfile?.error_message ? (
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {updatedData?.updateProfile?.error_message}
                  </Alert>
                ) : (
                  <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {updatedData?.updateProfile?.info}
                  </Alert>
                )}
              </Grid>
            )}
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default Container;
