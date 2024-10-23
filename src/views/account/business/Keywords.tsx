/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import { IFormValues } from '../interface';

// material-ui
import { Grid, TextField, Autocomplete, InputLabel, Stack } from '@material-ui/core';

// third party
import { FormikProps } from 'formik';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'views/common/constant';
import Chip from 'ui-component/extended/Chip';

const Keywords: FC<FormikProps<IFormValues>> = ({ errors, handleBlur, touched, values, setFieldValue }) => (
  <SubCard title="Keywords" sx={{ height: '100%' }}>
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <InputLabel sx={{ mb: 3 }}>Any Keywords For Your Brands? (Max. 5)</InputLabel>
        <Autocomplete
          multiple
          freeSolo
          disableClearable
          disableCloseOnSelect
          filterSelectedOptions
          blurOnSelect={false}
          options={[]}
          value={values.tags}
          onBlur={handleBlur}
          onChange={(event, value) => {
            setFieldValue('tags', value);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Keywords" helperText={touched.tags && errors.tags} error={Boolean(touched.tags && errors.tags)} />
          )}
          sx={{ '& .MuiAutocomplete-tag': { display: 'none' } }}
          disabled={values.tags.length >= 5}
        />
      </Grid>

      <Grid item xs={12}>
        <Stack direction="row" sx={{ flexWrap: 'wrap' }} spacing={1}>
          {values.tags.map((item) => {
            const handleDelete = () => {
              const newValues = values.tags.filter((e) => e !== item);
              setFieldValue('tags', newValues);
            };
            return <Chip key={item} sx={{ mb: 1 }} label={item} onDelete={handleDelete} />;
          })}
        </Stack>
      </Grid>
    </Grid>
  </SubCard>
);

export default Keywords;
