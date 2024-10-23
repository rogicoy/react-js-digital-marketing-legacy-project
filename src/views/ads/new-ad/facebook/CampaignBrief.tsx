/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useState } from 'react';
// material-ui imports
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { LocalizationProvider, MobileDatePicker } from '@material-ui/lab';
import {
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
  Radio
} from '@material-ui/core';

// material-ui icon imports
import DateRangeIcon from '@material-ui/icons/DateRange';

// third-party imports
import { Field } from 'formik';
import { Link } from 'react-router-dom';

// project imports
import { gridSpacing } from 'views/common/constant';

const CampaignBrief = ({ handleBlur, handleChange, setFieldValue, touched, errors, values }: any) => {
  const objectives = ['Lead Generation', 'Engagement', 'Traffic', 'Reach', 'Brand awareness'];

  const types = [
    { title: 'Per day', value: 'DAILY' },
    { title: 'Per week', value: 'WEEKLY' },
    { title: 'Per month', value: 'MONTHLY' }
  ];

  const handleToneOfVoiceChange = (event: any) => {
    setFieldValue('toneOfVoice', {
      ...values.toneOfVoice,
      [event.target.name]: event.target.checked
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ margin: '40px auto 0', width: '100%', maxWidth: '500px' }}>
        <Typography variant="h1" align="center">
          New Facebook Campaign Brief
        </Typography>
        <Box sx={{ marginTop: '80px' }}>
          <Box>
            <Typography variant="h4">Campaign Name</Typography>
            <Field
              name="campaignName"
              value={values.campaignName}
              onChange={handleChange}
              render={({ field }: any) => <TextField {...field} fullWidth sx={{ marginTop: '8px' }} />}
            />
          </Box>
          <Box sx={{ marginTop: '60px' }}>
            <Typography variant="h4">Objective</Typography>
            <Typography sx={{ marginTop: '8px' }}>What is the goal of your ad?</Typography>
            <FormControl fullWidth sx={{ marginTop: '8px' }}>
              <Field name="objective" type="select" as={Select} value={values.objective}>
                {objectives.map((objective) => (
                  <MenuItem value={objective}>{objective}</MenuItem>
                ))}
              </Field>
            </FormControl>
          </Box>
          <Box sx={{ marginTop: '60px' }}>
            <Typography variant="h4">Budget</Typography>
            <Typography sx={{ marginTop: '8px' }}>What would you like to spend?</Typography>
            <Grid container spacing={2} sx={{ paddingTop: '8px' }}>
              <Grid item xs={12} sm={6}>
                <Field
                  type="number"
                  name="budgetAmount"
                  value={values.budgetAmount}
                  onChange={handleChange}
                  render={({ field }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Field name="budgetType" type="select" as={Select} value={values.budgetType}>
                    {types.map((type) => (
                      <MenuItem value={type.title}>{type.title}</MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: '60px' }}>
            <Typography variant="h4">Duration</Typography>
            <Typography sx={{ marginTop: '8px' }}>
              You can choose to run your ads continuously starting today or only during a specific date range.
            </Typography>
            <Grid container spacing={2} sx={{ paddingTop: '8px' }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h4" sx={{ marginTop: '14px', fontWeight: 'normal' }}>
                  Start Date:
                </Typography>
                <MobileDatePicker
                  value={values.startDate}
                  inputFormat="dd/MM/yyyy"
                  onChange={(date) => {
                    setFieldValue('startDate', date);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <DateRangeIcon />
                          </InputAdornment>
                        )
                      }}
                      sx={{ marginTop: '8px' }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={<Checkbox name="isEndDateEnabled" onChange={handleChange} />}
                  label="End Date (optional):"
                  sx={{
                    '.MuiFormControlLabel-label': {
                      fontSize: '16px'
                    }
                  }}
                />
                {values.isEndDateEnabled && (
                  <MobileDatePicker
                    value={values.endDate}
                    inputFormat="dd/MM/yyyy"
                    onChange={(date) => {
                      setFieldValue('endDate', date);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <DateRangeIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: '60px' }}>
            <Typography variant="h4">Tone of voice</Typography>
            <Typography sx={{ marginTop: '8px' }}>Choose 3 options to describe the tone of voice</Typography>
            <Stack direction="row" spacing={2}>
              <FormControlLabel
                control={<Checkbox name="excited" checked={values.toneOfVoice.excited} onChange={handleToneOfVoiceChange} />}
                label="Excited"
              />
              <FormControlLabel
                control={<Checkbox name="casual" checked={values.toneOfVoice.casual} onChange={handleToneOfVoiceChange} />}
                label="Casual"
              />
              <FormControlLabel
                control={<Checkbox name="formal" checked={values.toneOfVoice.formal} onChange={handleToneOfVoiceChange} />}
                label="Formal"
              />
              <FormControlLabel
                control={<Checkbox name="playful" checked={values.toneOfVoice.playful} onChange={handleToneOfVoiceChange} />}
                label="Playful"
              />
            </Stack>
            <Field
              name="toneOfVoiceOther"
              value={values.toneOfVoiceOther}
              onChange={handleChange}
              placeholder="Other"
              render={({ field }: any) => (
                <TextField {...field} fullWidth placeholder="Other" sx={{ marginTop: '8px', maxWidth: '230px' }} />
              )}
            />
          </Box>
          <Box sx={{ marginTop: '60px' }}>
            <Typography variant="h4">Emojis</Typography>
            <Typography sx={{ marginTop: '8px' }}>Would you like us to include emojis?</Typography>
            <Stack direction="row" spacing={1}>
              <Field
                type="radio"
                name="hasEmoji"
                value="Yes"
                render={({ field }: any) => <FormControlLabel label="Yes" control={<Radio />} {...field} />}
              />
              <Field
                type="radio"
                name="hasEmoji"
                value="No"
                render={({ field }: any) => <FormControlLabel label="No" control={<Radio />} {...field} />}
              />
            </Stack>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default CampaignBrief;
