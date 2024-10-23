/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { useState } from 'react';

// material-ui
import {
  Grid,
  Typography,
  TextField,
  Slider,
  InputAdornment,
  FormControl,
  MenuItem,
  Select,
  Radio,
  FormControlLabel,
  Chip,
  ListItem,
  Box,
  Checkbox
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

// third-party imports
import { Field } from 'formik';

// project imports
import { gridSpacing } from 'views/common/constant';

const CreateAudience = ({ handleBlur, handleChange, touched, errors, values }: any) => {
  const [selectedTags, setSelectedTags] = useState(['food', 'bike', 'travel']);
  const valueText = (value: number) => `${value}km`;
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
    setSelectedTags((tags) => tags.filter((tag) => tag !== tagToDelete));
  };

  const handleOnKeyPress = (e: any) => {
    const { value } = e.target;
    if (e.key === 'Enter' && value !== '') {
      setSelectedTags([...selectedTags, value]);
      e.target.value = '';
    }
  };

  return (
    <>
      <Grid container alignContent="center" justifyContent="center">
        <Typography variant="h1">Audience cont.</Typography>
      </Grid>
      <Grid container spacing={gridSpacing} alignContent="center" justifyContent="center" sx={{ margin: '44px auto 0', maxWidth: '500px' }}>
        <Grid item xs={12}>
          <Typography variant="h4">Location</Typography>
          <Typography sx={{ marginTop: '12px' }}>Where people are located who will see your ad.</Typography>
          <TextField
            fullWidth
            name="createAudience_location"
            value={values.createAudience_location}
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={touched.createAudience_location && errors.createAudience_location}
            error={Boolean(touched.createAudience_location && errors.createAudience_location)}
            sx={{ marginTop: '12px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            required
          />
          <Slider
            aria-label="Custom marks"
            size="small"
            defaultValue={values.range}
            getAriaValueText={valueText}
            valueLabelDisplay="auto"
            min={5}
            max={100}
            marks={marks}
            sx={{ marginTop: '50px' }}
          />
        </Grid>
        <Grid item xs={12} sx={{ marginTop: '50px' }}>
          <Typography variant="h4" sx={{ marginBottom: '8px' }}>
            Age
          </Typography>
          <FormControl sx={{ width: '100px' }}>
            <Field name="createAudience_ageStart" type="select" as={Select} value={values.createAudience_ageStart}>
              {age.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Field>
          </FormControl>
          <FormControl sx={{ marginLeft: '8px', width: '100px' }}>
            <Field name="createAudience_ageEnd" type="select" as={Select} value={values.createAudience_ageEnd}>
              {age.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Field>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: '8px' }}>
          <Typography variant="h4" sx={{ marginBottom: '8px' }}>
            Gender
          </Typography>
          <Grid container item xs={12}>
            <Field
              type="radio"
              name="createAudience_gender"
              value="all"
              render={({ field }: any) => <FormControlLabel label="All" control={<Radio />} {...field} />}
            />
            <Field
              type="radio"
              name="createAudience_gender"
              value="men"
              render={({ field }: any) => <FormControlLabel label="Men" control={<Radio />} {...field} />}
            />
            <Field
              type="radio"
              name="createAudience_gender"
              value="women"
              render={({ field }: any) => <FormControlLabel label="Women" control={<Radio />} {...field} />}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: '50px' }}>
          <Typography variant="h4">Detailed targeting</Typography>
          <Typography sx={{ marginTop: '12px' }}>Include people who match:</Typography>
          <TextField
            fullWidth
            value={values.createAudience_tags}
            placeholder="Add demographics, interests or behaviors"
            onKeyPress={handleOnKeyPress}
            helperText={touched.createAudience_tags && errors.createAudience_tags}
            error={Boolean(touched.createAudience_tags && errors.createAudience_tags)}
            sx={{ marginTop: '12px' }}
            required
          />
          <Box sx={{ marginTop: '16px' }}>
            {selectedTags.map((item, index) => (
              <ListItem key={index} sx={{ display: 'inline-block', marginRight: '8px', width: 'auto', padding: 0 }}>
                <Chip label={item} onDelete={handleSelectedTagDelete(item)} />
              </ListItem>
            ))}
          </Box>
          <Typography variant="h5" sx={{ marginTop: '40px', marginBottom: '8px' }}>
            Detailed targeting expansion
          </Typography>
          <FormControlLabel
            control={<Checkbox name="createAudience_detailedTargetingExpansion" onChange={handleChange} />}
            label="Reach people beyond your detailed targeting selections when it's likely to improve performance."
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CreateAudience;
