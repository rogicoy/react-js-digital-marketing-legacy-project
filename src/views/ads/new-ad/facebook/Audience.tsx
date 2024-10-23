/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useCallback, useEffect, useState } from 'react';
// material-ui imports
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { LocalizationProvider, MobileDatePicker } from '@material-ui/lab';
import {
  Autocomplete,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  InputLabel,
  Box,
  Stack,
  RadioGroup,
  Radio,
  Slider,
  Chip,
  ListItem,
  CircularProgress
} from '@material-ui/core';

// material-ui icon imports
import DateRangeIcon from '@material-ui/icons/DateRange';
import SearchIcon from '@material-ui/icons/Search';

// third-party imports
import { Field } from 'formik';
import { Link } from 'react-router-dom';

// project imports
import { gridSpacing } from 'views/common/constant';
import { useLazyQuery } from '@apollo/client';
import gql from 'store/ads/new-ad/gql';
import { debounce } from 'lodash';

const Audience = ({ handleBlur, handleChange, setFieldValue, touched, errors, values }: any) => {
  // const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [getFacebookLocation, { loading, data }] = useLazyQuery(gql.query.getFacebookLocation, { fetchPolicy: 'network-only' });
  const [value, setValue] = useState<any>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<any>([]);
  const valueText = (radius: number) => `${radius}km`;
  const marks = [
    {
      value: 0,
      label: '5km'
    },
    {
      value: 100,
      label: '100km'
    }
  ];
  const age = [...Array(65)].map((currentValue, index) => (index === 64 ? '65+' : index + 1));

  const handleSelectedTagDelete = (tagToDelete: string | number) => () => {
    setFieldValue(
      'detailedTargeting',
      values.detailedTargeting.filter((tag: any) => tag !== tagToDelete)
    );
  };

  const handleOnKeyPress = (e: any) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      setFieldValue('detailedTargeting', [...values.detailedTargeting, e.target.value]);
      e.target.value = '';
    }
  };

  const delayedQuery = debounce((q) => {
    getFacebookLocation({
      variables: { search: q }
    });
  }, 500);

  const handleLocationOnChange = (e: any, newValue: string) => {
    setValue(newValue);
    setFieldValue('location', newValue);
  };

  const handleLocationOnInputChange = (e: any, newInputValue: string) => {
    setInputValue(newInputValue);
    delayedQuery(newInputValue);
  };

  const handleLocationRangeChange = (e: any, newValue: any) => {
    setFieldValue('range', newValue);
  };

  useEffect(() => {
    if (data && data.facebookLocations.length > 0) {
      const mappedFacebookLocations = data.facebookLocations.map((loc: any) => loc.label);
      setOptions(mappedFacebookLocations);
    } else {
      setOptions([]);
    }
  }, [data]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ margin: '40px auto 0', width: '100%', maxWidth: '500px' }}>
        <Typography variant="h1" align="center">
          Audience
        </Typography>
        <Box sx={{ marginTop: '80px' }}>
          <Box>
            <Typography variant="h4">Location</Typography>
            <Typography sx={{ marginTop: '8px' }}>Where people are located who will see your ad.</Typography>
            <Autocomplete
              filterOptions={(x) => x}
              options={options}
              autoComplete
              includeInputInList
              filterSelectedOptions
              value={values.location}
              loading={loading}
              onChange={handleLocationOnChange}
              onInputChange={handleLocationOnInputChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Enter Address"
                  fullWidth
                  sx={{ marginTop: '8px' }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    )
                  }}
                />
              )}
            />
            <Slider
              size="small"
              defaultValue={values.range}
              value={values.range}
              getAriaValueText={valueText}
              valueLabelDisplay="auto"
              min={5}
              max={100}
              marks={marks}
              sx={{ marginTop: '50px' }}
              onChange={handleLocationRangeChange}
            />
          </Box>
          <Box sx={{ marginTop: '60px' }}>
            <Typography variant="h4">Age</Typography>
            <Stack direction="row" spacing={2} sx={{ marginTop: '8px' }}>
              <FormControl sx={{ width: '100px' }}>
                <Field name="startAge" type="select" as={Select} value={values.startAge}>
                  {age.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Field>
              </FormControl>
              <FormControl sx={{ width: '100px' }}>
                <Field name="endAge" type="select" as={Select} value={values.endAge}>
                  {age.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Field>
              </FormControl>
            </Stack>
          </Box>
          <Box sx={{ marginTop: '60px' }}>
            <Typography variant="h4">Gender</Typography>
            <Stack direction="row" spacing={1}>
              <Field
                type="radio"
                name="gender"
                value="All"
                render={({ field }: any) => <FormControlLabel label="All" control={<Radio />} {...field} />}
              />
              <Field
                type="radio"
                name="gender"
                value="Men"
                render={({ field }: any) => <FormControlLabel label="Men" control={<Radio />} {...field} />}
              />
              <Field
                type="radio"
                name="gender"
                value="Women"
                render={({ field }: any) => <FormControlLabel label="Women" control={<Radio />} {...field} />}
              />
            </Stack>
          </Box>
          <Box sx={{ marginTop: '60px' }}>
            <Typography variant="h4">Detailed targeting</Typography>
            <Typography sx={{ marginTop: '8px' }}>Include people who match:</Typography>
            <TextField
              fullWidth
              placeholder="Add demographics, interests or behaviors"
              onKeyPress={handleOnKeyPress}
              sx={{ marginTop: '12px' }}
              required
            />
            {values.detailedTargeting.length > 0 && (
              <Box sx={{ marginTop: '16px' }}>
                {values.detailedTargeting.map((item: any, index: number) => (
                  <ListItem key={index} sx={{ display: 'inline-block', marginRight: '8px', width: 'auto', padding: 0 }}>
                    <Chip label={item} onDelete={handleSelectedTagDelete(item)} sx={{ backgroundColor: '#EDE7F6' }} />
                  </ListItem>
                ))}
              </Box>
            )}
          </Box>
          <Box sx={{ marginTop: '60px' }}>
            <Typography variant="h4">Is there anything else you’d like to let us know about your target customer?</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="targetCustomer"
              value={values.targetCustomer}
              onChange={handleChange}
              sx={{ marginTop: '8px' }}
            />
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default Audience;
