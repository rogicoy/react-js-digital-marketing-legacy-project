/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui imports
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { LocalizationProvider, MobileDatePicker } from '@material-ui/lab';
import { Grid, Typography, FormControl, Select, MenuItem, TextField, InputAdornment, Checkbox, FormControlLabel } from '@material-ui/core';

// material-ui icon imports
import DateRangeIcon from '@material-ui/icons/DateRange';

// third-party imports
import { Field } from 'formik';
import { Link } from 'react-router-dom';

// project imports
import { gridSpacing } from 'views/common/constant';

const BudgetAndDuration = ({ handleBlur, handleChange, setFieldValue, touched, errors, values }: any) => {
  const frequencies = [
    { title: 'Per day', value: 'DAILY' },
    { title: 'Per week', value: 'WEEKLY' },
    { title: 'Per month', value: 'MONTHLY' }
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container alignContent="center" justifyContent="center">
        <Typography variant="h1">Budget and Duration</Typography>
      </Grid>
      <Grid container spacing={gridSpacing} alignContent="center" justifyContent="center" sx={{ margin: '44px auto 0', maxWidth: '500px' }}>
        <Grid item xs={12}>
          <Typography variant="h4">Budget</Typography>
          <Typography sx={{ marginTop: '12px' }}>
            REMOVED will automatically optimize your budget to get the most results for the cheapest price. <Link to="#">Learn more</Link>
          </Typography>
          <Typography sx={{ marginTop: '12px' }}>What would you like to spend?</Typography>
        </Grid>
        <Grid container item spacing={gridSpacing} xs={12}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Amount"
              name="budgetAndDuration_budgetAmount"
              value={values.budgetAndDuration_budgetAmount}
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={touched.budgetAndDuration_budgetAmount && errors.budgetAndDuration_budgetAmount}
              error={Boolean(touched.budgetAndDuration_budgetAmount && errors.budgetAndDuration_budgetAmount)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Field name="budgetAndDuration_budgetFrequency" type="select" as={Select} value={values.budgetAndDuration_budgetFrequency}>
                {frequencies.map((frequency) => (
                  <MenuItem value={frequency.value}>{frequency.title}</MenuItem>
                ))}
              </Field>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: '20px' }}>
          <Typography variant="h4">Duration</Typography>
          <Typography sx={{ marginTop: '12px' }}>
            You can choose to run your ads continuously starting today or only during a specific date range.
          </Typography>
        </Grid>
        <Grid container item spacing={gridSpacing} xs={12}>
          <Grid container item>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ marginBottom: '12px' }}>Start Date:</Typography>
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
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox name="budgetAndDuration_isEndDateEnabled" onChange={handleChange} />}
                label="End Date (optional):"
              />
              {values.budgetAndDuration_isEndDateEnabled && (
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
                      error={Boolean(touched.endDate && errors.endDate)}
                      helperText={touched.endDate && errors.endDate}
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
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default BudgetAndDuration;
