/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui imports
import { Grid, Typography, TextField, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';

// third-party imports
import { Link } from 'react-router-dom';
import { Field } from 'formik';

// project imports
import userAvatarImg from 'assets/images/users/avatar-1.png';
import { gridSpacing } from 'views/common/constant';

const CampaignDetails = ({ handleBlur, handleChange, touched, errors, values }: any) => {
  const specialCategories = ['No categories declared', 'Credit', 'Employment', 'Housing', 'Social Issues', 'Elections', 'Politics'];

  return (
    <>
      <Grid container alignContent="center" justifyContent="center">
        <Typography variant="h1">Campaign details</Typography>
      </Grid>
      <Grid container spacing={gridSpacing} alignContent="center" justifyContent="center" sx={{ margin: '44px auto 0', maxWidth: '500px' }}>
        <Grid item xs={12}>
          <Typography variant="h4">Campaign name</Typography>
          <TextField
            fullWidth
            name="campaignDetails_campaignName"
            value={values.campaignDetails_campaignName}
            variant="filled"
            label="Campaign name"
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={touched.campaignDetails_campaignName && errors.campaignDetails_campaignName}
            error={Boolean(touched.campaignDetails_campaignName && errors.campaignDetails_campaignName)}
            sx={{ marginTop: '12px' }}
            required
          />
        </Grid>
        <Grid item xs={12} sx={{ marginTop: '20px' }}>
          <Typography variant="h4">Special Ad Categories</Typography>
          <Typography sx={{ marginTop: '12px' }}>
            Declare if your ads are related to credit, employment or housing, or about social issues, elections or politics. Requirements
            differ by country.
            <br />
            <Link to="#">Learn more</Link>
          </Typography>
          <FormControl fullWidth variant="filled" sx={{ marginTop: '12px' }}>
            <InputLabel id="campaignDetails_specialAdCategory-label">Special Ad Categories</InputLabel>
            <Field
              labelId="campaignDetails_specialAdCategory-label"
              name="campaignDetails_specialAdCategory"
              type="select"
              label="Special Ad Categories"
              as={Select}
              value={values.campaignDetails_specialAdCategory}
            >
              {specialCategories.map((category) => (
                <MenuItem value={category}>{category}</MenuItem>
              ))}
            </Field>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: '20px' }}>
          <Typography variant="h4">Identity</Typography>
          <Typography sx={{ marginTop: '12px' }}>The facebook and instagram accounts which will be connected with this ad.</Typography>
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={userAvatarImg}
                style={{
                  display: 'block',
                  width: '50px',
                  height: '50px',
                  border: '1px solid',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  objectFit: 'cover'
                }}
              />
              <div style={{ marginLeft: '20px' }}>
                <Typography variant="h4" sx={{ fontWeight: 'normal' }}>
                  Page Name
                </Typography>
                <Typography sx={{ marginTop: '6px' }}>ID: 10157861404605916</Typography>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default CampaignDetails;
