/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, createRef, useEffect, useMemo } from 'react';
import { editorWhiteTheme } from 'views/common/constant';
import { IToastImageEditor } from '../interface';

import { makeStyles } from '@material-ui/styles';
import { Button, DialogActions, DialogContent, DialogTitle, Typography, CircularProgress, Box } from '@material-ui/core';

// grapqhl
import { useLazyQuery } from '@apollo/client';
import gql from 'store/scheduler/gql';

// image editor
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import { FormikProps } from 'formik';

// style constant
const useStyles = makeStyles(() => ({
  root: {
    padding: 0
  },
  boxLoading: {
    width: '100%',
    height: '500px',
    position: 'absolute',
    display: 'flex',
    background: 'rgba(255,255,255,0.5)',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

// set any for now
const ToastImageEditor: FC<FormikProps<any> & IToastImageEditor> = ({ setFieldValue, values, path, handleClose, postId, social }) => {
  const classes = useStyles();
  const editorRef = createRef<any>();

  // gql
  const {
    query: { instagramSchedulePostByIdImage, facebookSchedulePostByIdImage, twitterSchedulePostByIdImage, linkedinSchedulePostByIdImage }
  } = gql;

  // IG
  const [fetchIgImage, { data: igImage, loading: igLoading }] = useLazyQuery<{
    instagramSchedulePostById: {
      imageUrl: string;
    };
  }>(instagramSchedulePostByIdImage, { fetchPolicy: 'network-only' });
  const postIgImage = igImage?.instagramSchedulePostById.imageUrl;

  // FB
  const [fetchFbImage, { data: fbImage, loading: fbLoading }] = useLazyQuery<{
    facebookSchedulePostById: {
      imageUrl: string;
    };
  }>(facebookSchedulePostByIdImage, { fetchPolicy: 'network-only' });
  const postFbImage = fbImage?.facebookSchedulePostById.imageUrl;

  // Twitter
  const [fetchTwImage, { data: twImage, loading: twLoading }] = useLazyQuery<{
    twitterSchedulePostById: {
      imageUrl: string;
    };
  }>(twitterSchedulePostByIdImage, { fetchPolicy: 'network-only' });
  const postTwImage = twImage?.twitterSchedulePostById.imageUrl;

  // Linked in
  const [fetchLiImage, { data: liImage, loading: liLoading }] = useLazyQuery<{
    linkedinSchedulePostByIdImage: {
      imageUrl: string;
    };
  }>(linkedinSchedulePostByIdImage, { fetchPolicy: 'network-only' });
  const postLiImage = liImage?.linkedinSchedulePostByIdImage.imageUrl;

  const handleDataToURl = () => {
    const instance = editorRef.current.getInstance();
    const image = instance.toDataURL();

    // re-apply image to the form when edited
    setFieldValue('image', image);
    setFieldValue('edited', true);
    handleClose();
  };

  useEffect(() => {
    if (postId && social) {
      if (social === 'instagram') {
        fetchIgImage({
          variables: {
            id: postId
          }
        });
      }

      if (social === 'facebook') {
        fetchFbImage({
          variables: {
            id: postId
          }
        });
      }

      if (social === 'twitter') {
        fetchTwImage({
          variables: {
            id: postId
          }
        });
      }

      if (social === 'linkedin') {
        fetchLiImage({
          variables: {
            id: postId
          }
        });
      }
    }
  }, [fetchIgImage, fetchFbImage, fetchTwImage, fetchLiImage, postId, social]);

  const memoImage = useMemo(() => {
    let image = path;

    if (postId) {
      if (postIgImage) image = postIgImage;
      if (postFbImage) image = postFbImage;
      if (postTwImage) image = postTwImage;
      if (postLiImage) image = postLiImage;

      // image = `${image}&cache=${Date.parse(new Date().toDateString())}`;
    }

    return `${image}&cache=${Date.parse(new Date().toDateString())}`;
    // return image;
  }, [postIgImage, postFbImage, postTwImage, postLiImage, postId]);

  return (
    <>
      <DialogTitle>
        <Typography sx={{ mb: 1.5, fontWeight: 600, fontSize: '1.75rem' }}>Editor</Typography>
      </DialogTitle>
      <DialogContent
        classes={{
          root: classes.root
        }}
      >
        {igLoading || fbLoading || twLoading || liLoading ? (
          <Box sx={{ height: '500px' }}>
            <Box className={classes.boxLoading}>
              <CircularProgress />
            </Box>
          </Box>
        ) : (
          <ImageEditor
            // @ts-ignore
            ref={editorRef}
            includeUI={{
              loadImage: {
                path: values.edited ? path : memoImage,
                name: 'ContentImage'
              },
              theme: editorWhiteTheme,
              menu: ['crop', 'filter', 'flip', 'draw', 'text'],
              initMenu: 'crop',
              uiSize: {
                width: '100%',
                height: '585px'
              },
              menuBarPosition: 'left'
            }}
            cssMaxHeight={500}
            cssMaxWidth={700}
            selectionStyle={{
              cornerSize: 20,
              rotatingPointOffset: 70
            }}
            usageStatistics
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button type="button" variant="contained" onClick={handleDataToURl}>
          Save
        </Button>
      </DialogActions>
    </>
  );
};

export default ToastImageEditor;
