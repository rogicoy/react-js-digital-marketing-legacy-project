/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Box, FormControl, FormControlLabel, Grid, MenuItem, Radio, Select, Typography } from '@material-ui/core';

// third party imports
import { format } from 'date-fns';

// project imports
import { gridSpacing } from 'views/common/constant';
import AdPreview from './AdPreview';
import { Field } from 'formik';

const useStyles = makeStyles(() => ({
  field: {
    paddingBottom: '14px',
    borderBottom: '1px solid #C4C4C4',
    '&:not(:first-child)': {
      marginTop: '14px'
    }
  }
}));

const ReviewAd = ({ values }: any) => {
  const classes = useStyles();

  return (
    <>
      <Grid container alignContent="center" justifyContent="center">
        <Typography variant="h1">Review your ad</Typography>
      </Grid>
      <Grid container spacing={12} alignContent="center" sx={{ marginTop: '20px' }}>
        <Grid item xs={5}>
          <Box className={classes.field}>
            <Typography variant="h4" sx={{ marginBottom: '8px' }}>
              Campaign name:
            </Typography>
            <Typography>{values.campaignDetails_campaignName}</Typography>
          </Box>
          <Box className={classes.field}>
            <Typography variant="h4" sx={{ marginBottom: '8px' }}>
              Objective:
            </Typography>
            <Typography>{values.objective}</Typography>
          </Box>
          <Box className={classes.field}>
            <Typography variant="h4" sx={{ marginBottom: '8px' }}>
              Audience:
            </Typography>
            <Typography>{values.audience_audienceTemplate}</Typography>
          </Box>
          <Box className={classes.field}>
            <Typography variant="h4" sx={{ marginBottom: '8px' }}>
              Ad text:
            </Typography>
            <Typography>{values.creative_primaryText}</Typography>
            <Typography>{values.creative_headline}</Typography>
            <Typography>{values.creative_description}</Typography>
            <Typography>{values.creative_displayLink}</Typography>
          </Box>
          <Box className={classes.field}>
            <Typography variant="h4" sx={{ marginBottom: '8px' }}>
              Call to action:
            </Typography>
            <Typography>{values.creative_CTA}</Typography>
          </Box>
          <Box className={classes.field}>
            <Typography variant="h4" sx={{ marginBottom: '8px' }}>
              Location:
            </Typography>
            <Typography>{values.createAudience_location}</Typography>
          </Box>
          <Box className={classes.field}>
            <Typography variant="h4" sx={{ marginBottom: '8px' }}>
              Form:
            </Typography>
            <Typography>{values.addForm_formName}</Typography>
          </Box>
          <Box className={classes.field}>
            <Typography variant="h4" sx={{ marginBottom: '8px' }}>
              Budget:
            </Typography>
            <Typography>
              ${values.budgetAndDuration_budgetAmount} {values.budgetAndDuration_budgetFrequency}
            </Typography>
          </Box>
          <Box className={classes.field}>
            <Typography variant="h4" sx={{ marginBottom: '8px' }}>
              Duration:
            </Typography>
            <Typography>
              {format(values.budgetAndDuration_startDate, 'do LLLL yyyy')}
              {values.budgetAndDuration_endDate !== '' && ` - ${format(values.budgetAndDuration_endDate, 'do LLLL, h.mmaaa')}`}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Grid item xs={12}>
            <Typography variant="h4">Preview</Typography>
            <Typography sx={{ marginTop: '12px', marginBottom: '24px' }}>
              For best results, your ad will be placed in throughout the Facebook eco system. Preview these placements below.
            </Typography>
            <Grid container spacing={gridSpacing}>
              <Grid item>
                <AdPreview
                  pageName="Page Name"
                  primaryText={values.creative_primaryText}
                  headline={values.creative_headline}
                  description={values.creative_description}
                  displayLink={values.creative_displayLink}
                  callToAction={values.creative_callToAction}
                  imageUrl={values.creative_imageURL}
                />
              </Grid>
              <Grid item sx={{ flexGrow: '1' }}>
                <FormControl fullWidth sx={{ marginBottom: '12px' }}>
                  <Field labelId="review_previewType-label" name="review_previewTypeSelect" type="select" as={Select}>
                    <MenuItem value="Feeds">Feeds</MenuItem>
                  </Field>
                </FormControl>
                <Box>
                  <Field
                    type="radio"
                    name="review_previewType"
                    value="Facebook Feed"
                    render={({ field }: any) => <FormControlLabel label="Facebook Feed" control={<Radio />} {...field} />}
                  />
                </Box>
                <Box>
                  <Field
                    type="radio"
                    name="review_previewType"
                    value="Instagram Feed"
                    render={({ field }: any) => <FormControlLabel label="Instagram Feed" control={<Radio />} {...field} />}
                  />
                </Box>
                <Box>
                  <Field
                    type="radio"
                    name="review_previewType"
                    value="Facebook Marketplace"
                    render={({ field }: any) => <FormControlLabel label="Facebook Marketplace" control={<Radio />} {...field} />}
                  />
                </Box>
                <Box>
                  <Field
                    type="radio"
                    name="review_previewType"
                    value="Instagram Explore"
                    render={({ field }: any) => <FormControlLabel label="Instagram Explore" control={<Radio />} {...field} />}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ReviewAd;
