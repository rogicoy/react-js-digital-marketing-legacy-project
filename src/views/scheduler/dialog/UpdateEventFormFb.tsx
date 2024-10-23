/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useState } from 'react';
import { format } from 'date-fns';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { Picker } from 'emoji-mart';
import helpers from 'utils/helpers';
import { gridSpacing } from 'views/common/constant';
import { SelectMediaFile } from 'store/select-media/main/models';
import { GetFbPostReponse } from 'store/scheduler/models';
import { IUpdateEventFormFb } from '../interface';
import { EventFbFormData } from '../types';

// material ui
import { makeStyles } from '@material-ui/styles';
import {
  Alert,
  Autocomplete,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  InputAdornment,
  IconButton,
  Stack,
  TextField,
  Theme,
  Typography,
  Menu,
  CircularProgress,
  Tooltip,
  Snackbar
} from '@material-ui/core';
import { LocalizationProvider, MobileDateTimePicker } from '@material-ui/lab';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';

// grapqhl
import { useMutation, useQuery } from '@apollo/client';
import gql from 'store/scheduler/gql';

// components
import SocialBadge from 'ui-component/extended/SocialBadge';
import Chip from 'ui-component/extended/Chip';
import SelectMedia from 'views/select-media';
import ToastImageEditor from './ToastImageEditor';
import ChooseVideoCover from './ChooseVideoCover';
import { confirmDialog } from 'ui-component/ConfirmDialog';
import EventHints from './EventHints';

// assets
import DateRangeIcon from '@material-ui/icons/DateRange';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@material-ui/icons/DriveFileRenameOutlineOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import Profile from 'assets/images/users/profile.png';
import FbIcon from 'assets/images/icons/fb.png';
import 'emoji-mart/css/emoji-mart.css';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  upload: {
    height: '100%',
    position: 'relative',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: '10px',
    background: '#fafafa',
    marginBottom: '7.5px',
    cursor: 'pointer',
    '& input': {
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: '0',
      right: '0',
      opacity: '0',
      cursor: 'pointer'
    }
  },
  image: {
    width: '100%',
    height: '300px',
    objectFit: 'contain'
  },
  icon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  editButton: {
    display: 'flex',
    alignItems: 'center',
    border: 'none',
    background: 'none',
    color: '#808080',
    cursor: 'pointer',
    '&:disabled': {
      cursor: 'default',
      color: '#d7d7d7'
    }
  },
  boxLoading: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    display: 'flex',
    background: 'rgba(255,255,255,0.5)',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  video: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    padding: '5px',
    height: '30px',
    width: '30px',
    textAlign: 'center',
    background: '#ffffff',
    borderRadius: '50%'
  },
  socialIcons: {
    width: '50px',
    height: '50px',
    display: 'block',
    margin: 'auto'
  }
}));

const UpdateEventFormFb: FC<IUpdateEventFormFb> = ({ range, social, postId, onCancel, onUpdate, onDelete }) => {
  // style
  const classes = useStyles();

  // state
  const [openEditor, setOpenEditor] = useState<boolean>(false);
  const [openVideoCover, setOpenVideoCover] = useState<boolean>(false);
  const [openContentManager, setOpenContentManager] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [isNewFile, setIsNewFile] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // graphql
  const {
    query: { facebookSchedulePostById },
    mutation: { facebookSchedulePost, facebookDeleteSchedulePost }
  } = gql;

  const [fbUpdatePost, { loading: updateLoading }] = useMutation<{
    facebookSchedulePost: {
      info: string;
      status: number;
      error_message: string;
      data: JSON;
    };
  }>(facebookSchedulePost, {
    fetchPolicy: 'network-only'
  });

  const [fbDeletePost, { loading: deleteLoading }] = useMutation<{
    facebookDeleteSchedulePost: {
      info: string;
      status: number;
      error_message: string;
      data: JSON;
    };
  }>(facebookDeleteSchedulePost, {
    fetchPolicy: 'network-only'
  });

  const { data: fbPostDetails, loading: postLoading } = useQuery<{
    facebookSchedulePostById: GetFbPostReponse;
  }>(facebookSchedulePostById, {
    variables: {
      id: postId
    },
    fetchPolicy: 'network-only'
  });
  const postDetails = fbPostDetails?.facebookSchedulePostById;

  // formik
  const initialValues: EventFbFormData = {
    mediaId: undefined,
    image: postDetails?.imageUrl ? postDetails.imageUrl : '',
    start: postDetails?.postAt ? new Date(postDetails.postAt) : range ? new Date(range.start) : new Date(),
    description: postDetails?.caption || '',
    location: postDetails?.locationTags ? JSON.parse(postDetails.locationTags) : [],
    mediaType: postDetails?.mediaType || 'IMAGE',
    mediaFrame: postDetails?.mediaFrame,
    edited: false
  };

  // onsubmit formik
  const onSubmit = async (values: EventFbFormData, { setSubmitting, setErrors }: FormikHelpers<EventFbFormData>) => {
    try {
      const { image, mediaId, description, start, location, mediaType, mediaFrame, edited } = values;

      let isMediaId = true;
      let videoCover: any = mediaFrame;
      let input: any = {
        caption: description,
        postAt: format(new Date(start), 'yyy/MM/dd hh:mm a'),
        calendarDate: format(new Date(start), 'MMMyyy').toUpperCase(),
        locationTags: JSON.stringify(location)
      };

      if (mediaType === 'VIDEO' && (edited === true || mediaId)) {
        videoCover = videoCover || (await helpers.generateVideoThumbnail(image));
        const blobVidedCover: Blob = helpers.dataURLtoBlob(videoCover);
        videoCover = new File([blobVidedCover], 'image_file.jpg', { lastModified: new Date().getTime(), type: 'image/jpeg' });

        /**
         * add mediaFrame here
         * for video
         */
        input = {
          ...input,
          mediaFrame: videoCover
        };
      }

      if (edited === true && mediaType === 'IMAGE') {
        const blob: Blob = helpers.dataURLtoBlob(values.image);
        const imageFile = new File([blob], 'image_file.jpg', { lastModified: new Date().getTime(), type: 'image/jpeg' });

        input = {
          ...input,
          file: imageFile
        };

        /**
         * set isMediaId to false
         * for edited images
         */
        isMediaId = false;
      }

      if (mediaId && isMediaId) {
        input = {
          ...input,
          mediaId
        };
      }

      const { data } = await fbUpdatePost({
        variables: {
          id: postId,
          input
        }
      });

      /**
       * success
       */
      if (data && data.facebookSchedulePost.status === 200) {
        onUpdate({
          id: postId,
          postDetailsForm: {
            ...values,
            image: helpers.fileToObjectUrl(image),
            mediaFrame: helpers.fileToObjectUrl(videoCover)
          }
        });
      }

      /**
       * error
       */
      if (data && data.facebookSchedulePost.status === 422) {
        const { error_message } = data.facebookSchedulePost;
        setErrors({
          image: error_message
        });
      }

      /**
       * only open when error 500 occurs
       */
      if (data && data.facebookSchedulePost.status === 500) {
        setOpenSnackbar(true);
      }
    } catch (error) {
      setOpenSnackbar(true);
      setSubmitting(false);
    }
  };

  const onDeletePost = async (confirm: boolean) => {
    if (confirm) {
      try {
        const { data } = await fbDeletePost({
          variables: {
            id: postId
          }
        });

        if (data && data.facebookDeleteSchedulePost.status === 200) onDelete(postId);
      } catch (error) {
        console.log(error);
      }
    }
  };

  /**
   * from content manager handler
   * @param formik
   * @param file
   */
  const handleInsertMedia = (formik: FormikProps<EventFbFormData>, file: SelectMediaFile) => {
    const { setFieldValue } = formik;

    // console.log(file);
    setFieldValue('mediaId', file.id);
    setFieldValue('image', file.link);
    setFieldValue('mediaType', file.media);
    // reset
    setFieldValue('edited', false);
    setFieldValue('mediaFrame', undefined);
    setIsNewFile(true);
    setOpenContentManager(false);
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseEmoji = () => {
    setAnchorEl(null);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        start: Yup.date(),
        image: Yup.string().required('Image is required')
      })}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {(formikProps) => {
        const { errors, handleChange, handleSubmit, setFieldValue, handleBlur, isSubmitting, touched, values } = formikProps;

        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              {(postLoading || deleteLoading || updateLoading || isSubmitting) && (
                <Box className={classes.boxLoading}>
                  <CircularProgress />
                </Box>
              )}
              <DialogTitle sx={{ background: 'linear-gradient(#7F66EB 0%, #9618F7 100%)' }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box display="flex" alignItems="center" sx={{ gap: 1 }}>
                    <img src={FbIcon} alt="Social icon" className={classes.socialIcons} />
                    <Typography variant="h2" color="#ffffff">
                      Facebook
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" sx={{ gap: 1 }}>
                    <SocialBadge social="facebook" avatarProps={{ src: social?.socialPic || Profile }} />
                    <Typography variant="h4" color="#ffffff">
                      {social?.label || 'Facebook Name'}
                    </Typography>
                  </Box>
                </Box>
              </DialogTitle>

              <Divider />
              <DialogContent sx={{ p: 3 }}>
                <Grid container spacing={gridSpacing}>
                  <Grid item md={4}>
                    <Grid container spacing={gridSpacing} sx={{ height: '100%' }}>
                      <Grid item xs={12} md={12}>
                        <Box className={classes.upload} onClick={() => setOpenContentManager(true)}>
                          {values.mediaType === 'VIDEO' && (
                            <Box className={classes.video}>
                              <VideocamOutlinedIcon sx={{ width: '20px', height: '20px' }} />
                            </Box>
                          )}

                          <div className={classes.icon}>
                            {values.image ? (
                              <>
                                {values.mediaType === 'VIDEO' ? (
                                  <>
                                    <video className={classes.image} muted key={helpers.fileToObjectUrl(values.image)}>
                                      <source src={helpers.fileToObjectUrl(values.image)} />
                                      Your browser does not support the video tag.
                                    </video>
                                  </>
                                ) : (
                                  <img src={helpers.fileToObjectUrl(values.image)} alt="upload" className={classes.image} />
                                )}
                              </>
                            ) : (
                              <Box sx={{ textAlign: 'center' }}>
                                <ImageOutlinedIcon sx={{ width: '75px', height: '75px' }} />
                                <Typography variant="subtitle2">Add Media from your Content Manager</Typography>
                              </Box>
                            )}
                          </div>
                        </Box>
                      </Grid>

                      {errors.image && touched.image && (
                        <Grid item xs={12} md={12}>
                          <Box sx={{ background: '#FBE9E7', p: 1.5 }}>
                            <Typography variant="caption" sx={{ color: '#D84315' }}>
                              {errors.image}
                            </Typography>
                          </Box>
                        </Grid>
                      )}

                      {values.image && (
                        <Grid item xs={12} md={12}>
                          <Box>
                            {values.mediaType === 'VIDEO' ? (
                              <Button type="button" variant="contained" onClick={() => setOpenVideoCover(true)} disabled={!values.image}>
                                Choose cover
                              </Button>
                            ) : (
                              <Button variant="contained" type="button" onClick={() => setOpenEditor(true)} disabled={!values.image}>
                                <DriveFileRenameOutlineOutlinedIcon sx={{ marginRight: '10px' }} />
                                Edit Image
                              </Button>
                            )}
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>

                  <Grid item md={5}>
                    <Grid container spacing={gridSpacing}>
                      <Grid item xs={12}>
                        <MobileDateTimePicker
                          minDateTime={new Date()}
                          value={values.start}
                          inputFormat="dd/MM/yyyy hh:mm a"
                          onChange={(date) => setFieldValue('start', date)}
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
                      <Grid item xs={12}>
                        <Box sx={{ position: 'relative' }}>
                          <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Caption"
                            placeholder="Add your caption and hashtags here"
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            error={Boolean(touched.description && errors.description)}
                            helperText={touched.description && errors.description}
                          />

                          <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                            <IconButton onClick={handleClick} sx={{ padding: '10px' }}>
                              <EmojiEmotionsOutlinedIcon />
                            </IconButton>
                          </div>

                          <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleCloseEmoji}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right'
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right'
                            }}
                          >
                            <Picker
                              onClick={(emoji: any, event) => setFieldValue('description', `${values.description} ${emoji?.native}`)}
                              useButton
                              emojiSize={18}
                              enableFrequentEmojiSort={false}
                              showPreview={false}
                              showSkinTones={false}
                            />
                          </Menu>
                        </Box>
                      </Grid>
                      <Grid container item xs={12} spacing={gridSpacing}>
                        <Grid item xs={12}>
                          <Autocomplete
                            multiple
                            freeSolo
                            disableClearable
                            disableCloseOnSelect
                            filterSelectedOptions
                            blurOnSelect={false}
                            options={[]}
                            value={values.location}
                            onBlur={handleBlur}
                            onChange={(event, value) => {
                              setFieldValue('location', value);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Location"
                                helperText={touched.location && errors.location}
                                error={Boolean(touched.location && errors.location)}
                              />
                            )}
                            sx={{ '& .MuiAutocomplete-tag': { display: 'none' } }}
                            disabled={values.location.length >= 5}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Stack direction="row" sx={{ flexWrap: 'wrap' }} spacing={1}>
                            {values.location.map((item) => {
                              const handleDelete = () => {
                                const newValues = values.location.filter((e) => e !== item);
                                setFieldValue('location', newValues);
                              };
                              return <Chip key={item} sx={{ mb: 1 }} label={item} onDelete={handleDelete} />;
                            })}
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item md={3}>
                    <EventHints />
                  </Grid>
                </Grid>
              </DialogContent>

              <DialogActions sx={{ p: 3 }}>
                <Tooltip title="Delete Event">
                  <IconButton
                    onClick={() => {
                      confirmDialog({
                        message: 'Are you sure you want to delete this post?',
                        open: true,
                        onSubmit: (x) => onDeletePost(x)
                      });
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Tooltip>
                <Grid container justifyContent="end" alignItems="center">
                  <Grid item>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Button type="button" variant="outlined" onClick={onCancel}>
                        Close
                      </Button>
                      <Button type="submit" variant="contained" disabled={isSubmitting}>
                        Update
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </DialogActions>
            </Form>

            <Dialog
              maxWidth="md"
              fullWidth
              onClose={() => setOpenEditor(false)}
              open={openEditor}
              sx={{ '& .MuiDialog-paper': { p: 0 } }}
              disableEnforceFocus
            >
              <ToastImageEditor
                {...formikProps}
                path={helpers.fileToObjectUrl(values.image)}
                handleClose={() => setOpenEditor(false)}
                postId={values.edited === false && !isNewFile ? postId : undefined}
                social="facebook"
              />
            </Dialog>

            <Dialog
              maxWidth="md"
              fullWidth
              onClose={() => setOpenVideoCover(false)}
              open={openVideoCover}
              sx={{ '& .MuiDialog-paper': { p: 0 } }}
              disableEnforceFocus
            >
              <ChooseVideoCover
                {...formikProps}
                onClose={() => setOpenVideoCover(false)}
                postId={values.edited === false && !isNewFile ? postId : undefined}
                social="facebook"
              />
            </Dialog>

            {/**
             * content manager
             */}
            <SelectMedia
              open={openContentManager}
              onClose={() => setOpenContentManager(false)}
              onInsertMedia={(file) => file && handleInsertMedia(formikProps, file)}
            />

            {/**
             * snackbar
             */}
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              onClose={() => setOpenSnackbar(false)}
            >
              <Alert severity="error" onClose={() => setOpenSnackbar(false)}>
                Error 500: Something went wrong
              </Alert>
            </Snackbar>
          </LocalizationProvider>
        );
      }}
    </Formik>
  );
};

export default UpdateEventFormFb;
