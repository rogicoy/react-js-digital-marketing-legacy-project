/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
  Typography
} from '@material-ui/core';

// material-ui icon imports
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Field } from 'formik';

// project imports
import { gridSpacing } from 'views/common/constant';
import AdPreview from './AdPreview';

const AddForm = ({ handleBlur, handleChange, touched, errors, values }: any) => (
  <>
    <Grid container alignContent="center" justifyContent="center">
      <Typography variant="h1">Add a form to capture you leads</Typography>
    </Grid>
    <Grid container spacing={12} alignContent="center" sx={{ marginTop: '20px' }}>
      <Grid item xs={5}>
        <Typography variant="h4" sx={{ marginBottom: '8px' }}>
          Form Name
        </Typography>
        <TextField
          fullWidth
          name="addForm_formName"
          value={values.addForm_formName}
          label="Form Name"
          variant="filled"
          onBlur={handleBlur}
          onChange={handleChange}
          helperText={touched.addForm_formName && errors.addForm_formName}
          error={Boolean(touched.addForm_formName && errors.addForm_formName)}
          sx={{ marginBottom: '20px' }}
          required
        />
        <Accordion sx={{ '::before': { background: 'none' }, margin: '0 !important' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ margin: '0px', minHeight: '0px !important', paddingLeft: '0px', paddingRight: '0px' }}
          >
            <Typography variant="h4" sx={{ marginBottom: '8px' }}>
              Intro
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingLeft: '0px', paddingRight: '0px' }}>
            <TextField
              fullWidth
              name="addForm_introHeadline"
              value={values.addForm_introHeadline}
              label="Intro"
              variant="filled"
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={touched.addForm_introHeadline && errors.addForm_introHeadline}
              error={Boolean(touched.addForm_introHeadline && errors.addForm_introHeadline)}
              inputProps={{ maxLength: 60 }}
              required
            />
            <TextField
              fullWidth
              name="addForm_introDescription"
              value={values.addForm_introDescription}
              label="Description"
              variant="filled"
              multiline
              minRows={2}
              maxRows={5}
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={touched.addForm_introDescription && errors.addForm_introDescription}
              error={Boolean(touched.addForm_introDescription && errors.addForm_introDescription)}
              required
              sx={{ marginTop: '20px' }}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ '::before': { background: 'none' }, margin: '0 !important' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ margin: '0px', minHeight: '0px !important', paddingLeft: '0px', paddingRight: '0px' }}
          >
            <Typography variant="h4" sx={{ marginBottom: '8px' }}>
              Questions
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingLeft: '0px', paddingRight: '0px' }}>
            <Typography>
              What information would you like to collect with this form? This will be prefilled from their Facebook account.
            </Typography>
            <Box>
              <FormControlLabel
                control={<Checkbox name="addForm_isEmailEnabled" onChange={handleChange} defaultChecked />}
                label="Email (recommended)"
              />
            </Box>
            <Box>
              <FormControlLabel
                control={<Checkbox name="addForm_isFullNameEnabled" onChange={handleChange} defaultChecked />}
                label="Full Name (recommended)"
              />
            </Box>
            <Box>
              <FormControlLabel control={<Checkbox name="addForm_isPhoneEnabled" onChange={handleChange} />} label="Phone Number" />
            </Box>
            <Box>
              <FormControlLabel control={<Checkbox name="addForm_isPostcodeEnabled" onChange={handleChange} />} label="Postcode" />
            </Box>
            <Box>
              <FormControlLabel control={<Checkbox name="addForm_isCityEnabled" onChange={handleChange} />} label="City" />
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ '::before': { background: 'none' }, margin: '0 !important' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ margin: '0px', minHeight: '0px !important', paddingLeft: '0px', paddingRight: '0px' }}
          >
            <Typography variant="h4" sx={{ marginBottom: '8px' }}>
              Privacy
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingLeft: '0px', paddingRight: '0px' }}>
            <Typography>
              Because you will be collecting customer information, you need to include a link to your company&apos;s privacy policy. Your
              link will appear with Facebook&apos;s default privacy disclaimer.
            </Typography>
            <TextField
              fullWidth
              name="addForm_link"
              value={values.addForm_link}
              label="Link"
              variant="filled"
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={touched.addForm_link && errors.addForm_link}
              error={Boolean(touched.addForm_link && errors.addForm_link)}
              required
              sx={{ marginTop: '20px' }}
            />
            <TextField
              fullWidth
              name="addForm_linkText"
              value={values.addForm_linkText}
              label="Description"
              variant="filled"
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={touched.addForm_linkText && errors.addForm_linkText}
              error={Boolean(touched.addForm_linkText && errors.addForm_linkText)}
              required
              sx={{ marginTop: '20px' }}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ '::before': { background: 'none' }, margin: '0 !important' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ margin: '0px', minHeight: '0px !important', paddingLeft: '0px', paddingRight: '0px' }}
          >
            <Typography variant="h4" sx={{ marginBottom: '8px' }}>
              Completion
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingLeft: '0px', paddingRight: '0px' }}>
            <Typography>Let people who submit their information know what to expect next.</Typography>
            <TextField
              fullWidth
              name="addForm_completionHeadline"
              value={values.addForm_completionHeadline}
              label="Headline"
              variant="filled"
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={touched.addForm_completionHeadline && errors.addForm_completionHeadline}
              error={Boolean(touched.addForm_completionHeadline && errors.addForm_completionHeadline)}
              required
              sx={{ marginTop: '20px' }}
            />
            <TextField
              fullWidth
              name="addForm_completionDescription"
              value={values.addForm_completionDescription}
              label="Description"
              variant="filled"
              multiline
              minRows={2}
              maxRows={5}
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={touched.addForm_completionDescription && errors.addForm_completionDescription}
              error={Boolean(touched.addForm_completionDescription && errors.addForm_completionDescription)}
              required
              sx={{ marginTop: '20px' }}
            />
            <FormControl fullWidth variant="filled" sx={{ marginTop: '20px' }}>
              <InputLabel id="addForm_callToAction-label">Call to action</InputLabel>
              <Field
                labelId="addForm_callToAction-label"
                id="existingAudience"
                name="addForm_callToAction"
                type="select"
                label="Call to action"
                as={Select}
                value={values.addForm_callToAction}
              >
                <MenuItem value="View Website">View Website</MenuItem>
              </Field>
            </FormControl>
            <TextField
              fullWidth
              name="addForm_completionCallToActionText"
              value={values.addForm_completionCallToActionText}
              label="Call to action text"
              variant="filled"
              multiline
              minRows={2}
              maxRows={5}
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={touched.addForm_completionCallToActionText && errors.addForm_completionCallToActionText}
              error={Boolean(touched.addForm_completionCallToActionText && errors.addForm_completionCallToActionText)}
              required
              sx={{ marginTop: '20px' }}
            />
            <TextField
              fullWidth
              name="addForm_completionDisplayLink"
              value={values.addForm_completionDisplayLink}
              label="Display link"
              variant="filled"
              multiline
              minRows={2}
              maxRows={5}
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={touched.addForm_completionDisplayLink && errors.addForm_completionDisplayLink}
              error={Boolean(touched.addForm_completionDisplayLink && errors.addForm_completionDisplayLink)}
              required
              sx={{ marginTop: '20px' }}
            />
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={7}>
        <Typography variant="h4">Preview</Typography>
        <Typography sx={{ marginTop: '12px', marginBottom: '24px' }}>Preview each step of your sign up form</Typography>
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
            <Box>
              <Field
                type="radio"
                name="addForm_previewType"
                value="Intro"
                render={({ field }: any) => <FormControlLabel label="Intro" control={<Radio />} {...field} />}
              />
            </Box>
            <Box>
              <Field
                type="radio"
                name="addForm_previewType"
                value="Prefill information"
                render={({ field }: any) => <FormControlLabel label="Prefill information" control={<Radio />} {...field} />}
              />
            </Box>
            <Box>
              <Field
                type="radio"
                name="addForm_previewType"
                value="Privacy review"
                render={({ field }: any) => <FormControlLabel label="Privacy review" control={<Radio />} {...field} />}
              />
            </Box>
            <Box>
              <Field
                type="radio"
                name="addForm_previewType"
                value="Submission message"
                render={({ field }: any) => <FormControlLabel label="Submission message" control={<Radio />} {...field} />}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </>
);

export default AddForm;
