/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import { IFormValues } from '../interface';

// material-ui
import { Grid, TextField, Autocomplete } from '@material-ui/core';

// third party
import { FormikProps } from 'formik';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing, industries } from 'views/common/constant';
import MaterialUiPhoneNumber from 'ui-component/material-ui-phone-number';

const industryOptions = industries;

const BusinessDetails: FC<FormikProps<IFormValues>> = ({ errors, handleBlur, handleChange, touched, values, setFieldValue }) => (
  <SubCard title="Business Details" sx={{ height: '100%' }}>
    <Grid container spacing={gridSpacing}>
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
          inputProps={{ maxLength: 100 }}
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
          inputProps={{ maxLength: 50 }}
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
          onChange={(value: string) => {
            setFieldValue('phone', value);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          disableClearable
          options={industryOptions}
          value={values.industries}
          onBlur={handleBlur}
          onChange={(event, value) => {
            setFieldValue('industries', value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Industry"
              helperText={touched.industries && errors.industries}
              error={Boolean(touched.industries && errors.industries)}
            />
          )}
          // @ts-ignore
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />
      </Grid>
    </Grid>
  </SubCard>
);

export default BusinessDetails;
