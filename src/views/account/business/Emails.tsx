/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC } from 'react';
import { IFormValues } from '../interface';

// material-ui
import { Grid, TextField, Autocomplete, Switch, Stack, InputLabel } from '@material-ui/core';

// third party
import { FormikProps } from 'formik';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'views/common/constant';
import Chip from 'ui-component/extended/Chip';

const Emails: FC<FormikProps<IFormValues>> = ({ errors, handleBlur, touched, values, setFieldValue }) => {
  const validateEmail = (email: string, emails: string[]) => {
    const isValid = email.match(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (isValid) setFieldValue('leadEmails', emails);
  };

  return (
    <SubCard title="Emails" sx={{ height: '100%' }}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <InputLabel sx={{ mb: 3, height: 20.13 }}>
            Enable lead sending?{' '}
            <Switch
              size="small"
              color="primary"
              checked={values.isLeadEnabled}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFieldValue('isLeadEnabled', event.target.checked)}
            />
          </InputLabel>

          <Autocomplete
            disabled={!values.isLeadEnabled}
            multiple
            freeSolo
            disableClearable
            disableCloseOnSelect
            filterSelectedOptions
            blurOnSelect={false}
            options={[]}
            value={values.leadEmails}
            onBlur={handleBlur}
            onChange={(event, value) => {
              // @ts-ignore
              validateEmail(event.target.value, value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Emails"
                helperText={touched.leadEmails && errors.leadEmails}
                error={Boolean(touched.leadEmails && errors.leadEmails)}
              />
            )}
            sx={{ '& .MuiAutocomplete-tag': { display: 'none' } }}
            // @ts-ignore
            // isOptionEqualToValue={(option, value) => option.id === value.id}
          />
        </Grid>

        {values.isLeadEnabled && (
          <Grid item xs={12}>
            <Stack direction="row" sx={{ flexWrap: 'wrap' }} spacing={1}>
              {values.leadEmails.map((item) => {
                const handleDelete = () => {
                  const newValues = values.leadEmails.filter((e) => e !== item);
                  setFieldValue('leadEmails', newValues);
                };

                return <Chip key={item} sx={{ mb: 1 }} label={item} onDelete={handleDelete} />;
              })}
            </Stack>
          </Grid>
        )}
      </Grid>
    </SubCard>
  );
};

export default Emails;
