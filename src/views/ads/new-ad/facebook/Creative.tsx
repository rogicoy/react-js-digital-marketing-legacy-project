/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { useCallback, useMemo } from 'react';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Box, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, Select, TextField, Typography } from '@material-ui/core';

// third-party imports
import { Field } from 'formik';
import { useDropzone } from 'react-dropzone';

// project imports
import { gridSpacing } from 'views/common/constant';
import AdPreview from './AdPreview';

const Creative = ({ handleBlur, handleChange, touched, errors, values, setFieldValue }: any) => {
  const theme = useTheme();
  const callToActionItems = ['Sign up', 'Subscribe', 'Apply now', 'Book now', 'Download', 'Get offer', 'Get quote', 'Learn more'];
  const fileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'];

  const onDrop = useCallback((files) => {
    console.log(files);
    files.forEach((file: File) => {
      const url = URL.createObjectURL(file);
      setFieldValue('creative_imageURL', url);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({ onDrop, maxFiles: 1, accept: fileTypes });

  const baseStyle = {
    marginTop: 12,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: theme.palette.grey[500],
    borderStyle: 'dashed',
    cursor: 'pointer',
    background: theme.palette.grey[100],
    padding: '1rem'
  };

  const activeStyle = {
    borderColor: theme.palette.primary.main
  };

  const acceptStyle = {
    borderColor: theme.palette.success.main
  };

  const rejectStyle = {
    borderColor: theme.palette.error.main
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <>
      <Grid container alignContent="center" justifyContent="center">
        <Typography variant="h1">What will your ad looks like?</Typography>
      </Grid>
      <Grid container spacing={12} alignContent="center" sx={{ marginTop: '20px' }}>
        <Grid item xs={5}>
          <Grid item xs={12}>
            <Typography variant="h4">Media</Typography>
            <Box component="div" {...getRootProps({ style })}>
              <input {...getInputProps()} />
              <Grid container justifyContent="center" alignContent="center" height="50px">
                <Grid item>
                  <Typography variant="h4" sx={{ color: theme.palette.grey[500] }}>
                    Drag &apos;n&apos; drop an image here, or click to upload.
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <TextField
              fullWidth
              name="creative_primaryText"
              value={values.creative_primaryText}
              label="Primary Text"
              variant="filled"
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={touched.creative_primaryText && errors.creative_primaryText}
              error={Boolean(touched.creative_primaryText && errors.creative_primaryText)}
              sx={{ marginTop: '20px' }}
              required
            />
            <TextField
              fullWidth
              name="creative_headline"
              value={values.creative_headline}
              label="Headline (optional)"
              variant="filled"
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={touched.creative_headline && errors.creative_headline}
              error={Boolean(touched.creative_headline && errors.creative_headline)}
              sx={{ marginTop: '20px' }}
              required
            />
            <TextField
              fullWidth
              name="creative_description"
              value={values.creative_description}
              label="Description (optional)"
              variant="filled"
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={touched.creative_description && errors.creative_description}
              error={Boolean(touched.creative_description && errors.creative_description)}
              sx={{ marginTop: '20px' }}
              required
            />
            <TextField
              fullWidth
              name="creative_displayLink"
              value={values.creative_displayLink}
              label="Display link (optional)"
              variant="filled"
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={touched.creative_displayLink && errors.creative_displayLink}
              error={Boolean(touched.creative_displayLink && errors.creative_displayLink)}
              sx={{ marginTop: '20px' }}
              required
            />
            <FormControl variant="filled" fullWidth sx={{ marginTop: '20px' }}>
              <InputLabel id="creative_callToAction-label">Call to action</InputLabel>
              <Field
                labelId="creative_callToAction-label"
                name="creative_callToAction"
                type="select"
                label="Call to action"
                as={Select}
                value={values.creative_callToAction}
              >
                {callToActionItems.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Field>
            </FormControl>
          </Grid>
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
                  <Field labelId="creative_previewType-label" name="creative_previewTypeSelect" type="select" as={Select}>
                    <MenuItem value="Feeds">Feeds</MenuItem>
                  </Field>
                </FormControl>
                <Box>
                  <Field
                    type="radio"
                    name="creative_previewType"
                    value="Facebook Feed"
                    render={({ field }: any) => <FormControlLabel label="Facebook Feed" control={<Radio />} {...field} />}
                  />
                </Box>
                <Box>
                  <Field
                    type="radio"
                    name="creative_previewType"
                    value="Instagram Feed"
                    render={({ field }: any) => <FormControlLabel label="Instagram Feed" control={<Radio />} {...field} />}
                  />
                </Box>
                <Box>
                  <Field
                    type="radio"
                    name="creative_previewType"
                    value="Facebook Marketplace"
                    render={({ field }: any) => <FormControlLabel label="Facebook Marketplace" control={<Radio />} {...field} />}
                  />
                </Box>
                <Box>
                  <Field
                    type="radio"
                    name="creative_previewType"
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

export default Creative;
