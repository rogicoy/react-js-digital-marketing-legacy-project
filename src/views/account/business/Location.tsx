/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useEffect, useMemo, useState } from 'react';
import { IFormValues } from '../interface';

// material-ui
import { Grid, TextField, Autocomplete, InputLabel, Stack } from '@material-ui/core';

// third party
import { FormikProps } from 'formik';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'views/common/constant';
import Chip from 'ui-component/extended/Chip';
// import timezones from 'views/common/timezones';
import timezoneList from 'views/common/timezonelist';
import { isDstObserved } from 'views/common/tools';

const Location: FC<FormikProps<IFormValues>> = ({ errors, handleBlur, handleChange, touched, values, setFieldValue }) => {
  const timezoneOptions = useMemo(() => {
    const checked = true;
    return timezoneList.map((tz) => ({
      label: tz,
      value: tz
    }));
  }, []);

  const [tz, setTz] = useState(() => timezoneOptions.find((e) => e.value === values.timezone) || timezoneOptions[0]);

  useEffect(() => {
    setFieldValue('timezone', tz.value);
  }, [tz]);

  return (
    <SubCard title="Location" sx={{ height: '100%' }}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <InputLabel sx={{ mb: 3 }}>Where is the primary location of your business?</InputLabel>
          <TextField
            fullWidth
            value={values.locations}
            name="locations"
            label="Location"
            onChange={handleChange}
            helperText={touched.locations && errors.locations}
            error={Boolean(touched.locations && errors.locations)}
          />
          {/* <Autocomplete
            multiple
            freeSolo
            disableClearable
            disableCloseOnSelect
            filterSelectedOptions
            blurOnSelect={false}
            options={[]}
            value={values.locations}
            onBlur={handleBlur}
            onChange={(event, value) => {
              setFieldValue('locations', value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Location"
                helperText={touched.locations && errors.locations}
                error={Boolean(touched.locations && errors.locations)}
              />
            )}
            sx={{ '& .MuiAutocomplete-tag': { display: 'none' } }}
            disabled={values.locations.length >= 5}
          /> */}
        </Grid>

        {/* <Grid item xs={12}>
          <Stack direction="row" sx={{ flexWrap: 'wrap' }} spacing={1}>
            {values.locations.map((item) => {
              const handleDelete = () => {
                const newValues = values.locations.filter((e) => e !== item);
                setFieldValue('locations', newValues);
              };
              return <Chip key={item} sx={{ mb: 1 }} label={item} onDelete={handleDelete} />;
            })}
          </Stack>
        </Grid> */}

        <Grid item xs={12}>
          <Autocomplete
            disableClearable
            autoHighlight
            options={timezoneOptions}
            value={tz}
            onBlur={handleBlur}
            onChange={(event, value) => {
              setTz(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Timezone"
                helperText={touched.timezone && errors.timezone}
                error={Boolean(touched.timezone && errors.timezone)}
              />
            )}
          />
        </Grid>
      </Grid>
    </SubCard>
  );
};

export default Location;
