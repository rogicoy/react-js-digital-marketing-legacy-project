/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FormikProps } from 'formik';
// import helpers from 'utils/helpers';
// import { EventIgFormData } from '../types';

// grapqhl
import { useLazyQuery } from '@apollo/client';
import gql from 'store/scheduler/gql';

// material ui
import { makeStyles } from '@material-ui/styles';
import { Box, Button, DialogActions, DialogContent, DialogTitle, Typography, Slider, CircularProgress } from '@material-ui/core';
import { IChooseVideoCover } from '../interface';

// style constant
const useStyles = makeStyles(() => ({
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

const ChooseVideoCover: FC<FormikProps<any> & IChooseVideoCover> = ({ setFieldValue, values, postId, onClose, social }) => {
  const classes = useStyles();

  const [vidRef, setVidRef] = useState<boolean>(false);
  const [vidMax, setVidMax] = useState<number>(0);
  const [mediaFrameSec, setMediaFrameSec] = useState<number>(0);

  // gql
  const {
    query: { instagramSchedulePostByIdImage, facebookSchedulePostByIdImage, twitterSchedulePostByIdImage, linkedinSchedulePostByIdImage }
  } = gql;

  const [fetchIgVideo, { data: igVideo, loading: igLoading }] = useLazyQuery<{
    instagramSchedulePostById: {
      imageUrl: string;
    };
  }>(instagramSchedulePostByIdImage, { fetchPolicy: 'network-only' });
  const postIgVideo = igVideo?.instagramSchedulePostById.imageUrl;

  const [fetchFbVideo, { data: fbVideo, loading: fbLoading }] = useLazyQuery<{
    facebookSchedulePostById: {
      imageUrl: string;
    };
  }>(facebookSchedulePostByIdImage, { fetchPolicy: 'network-only' });
  const postFbVideo = fbVideo?.facebookSchedulePostById.imageUrl;

  const [fetchTwVideo, { data: twVideo, loading: twLoading }] = useLazyQuery<{
    twitterSchedulePostById: {
      imageUrl: string;
    };
  }>(twitterSchedulePostByIdImage, { fetchPolicy: 'network-only' });
  const postTwVideo = twVideo?.twitterSchedulePostById.imageUrl;

  const [fetchLiVideo, { data: liVideo, loading: liLoading }] = useLazyQuery<{
    linkedinSchedulePostById: {
      imageUrl: string;
    };
  }>(linkedinSchedulePostByIdImage, { fetchPolicy: 'network-only' });
  const postLiVideo = liVideo?.linkedinSchedulePostById.imageUrl;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef?.current;
  const ctx = canvas?.getContext('2d');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const video = videoRef?.current;

  const handleSaveThumbnail = () => {
    if (ctx && video && canvas) {
      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const mediaFrame = canvas.toDataURL();

      // console.log(mediaFrame);
      setFieldValue('mediaFrame', mediaFrame);
      setFieldValue('mediaFrameSec', mediaFrameSec);
      setFieldValue('edited', true);
      onClose();
    }
  };

  const handleChangeSeconds = (event: Event, newValue: number | number[]) => {
    if (video) {
      video.currentTime = +newValue;
      setMediaFrameSec(+newValue);
    }
  };

  const onVideoChangeRef = useCallback(
    (node: HTMLVideoElement) => {
      if (!igLoading || !fbLoading || !twLoading || !liLoading) {
        videoRef.current = node;
        setVidRef(!!node);
      }
    },
    [igLoading, fbLoading, twLoading, liLoading]
  );

  useEffect(() => {
    if (vidRef && video && canvas) {
      video.onloadedmetadata = () => {
        const duration = Math.round(video.duration);

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        video.currentTime = values?.mediaFrameSec || 0;
        setVidMax(duration);
      };
    }
  }, [vidRef]);

  useEffect(() => {
    setMediaFrameSec(values?.mediaFrameSec || 0);
  }, []);

  useEffect(() => {
    if (postId && social) {
      if (social === 'instagram') {
        fetchIgVideo({
          variables: {
            id: postId
          }
        });
      }

      if (social === 'facebook') {
        fetchFbVideo({
          variables: {
            id: postId
          }
        });
      }

      if (social === 'twitter') {
        fetchTwVideo({
          variables: {
            id: postId
          }
        });
      }

      if (social === 'linkedin') {
        fetchLiVideo({
          variables: {
            id: postId
          }
        });
      }
    }
  }, [fetchIgVideo, fetchFbVideo, fetchTwVideo, fetchLiVideo, postId, social]);

  const memoPostVideo = useMemo(() => {
    let postVideo = values.image;

    if (postId) {
      if (postIgVideo) postVideo = postIgVideo;
      if (postFbVideo) postVideo = postFbVideo;
      if (postTwVideo) postVideo = postTwVideo;
      if (postLiVideo) postVideo = postLiVideo;

      postVideo = `${postVideo}&cache=${Date.parse(new Date().toDateString())}`;
    }

    return postVideo;
  }, [postIgVideo, postFbVideo, postTwVideo, postLiVideo, postId]);

  return (
    <>
      <DialogTitle>
        <Typography sx={{ mb: 1.5, fontWeight: 600, fontSize: '1.75rem' }}>Set cover image</Typography>
      </DialogTitle>
      <DialogContent sx={{ textAlign: 'center', p: 10 }}>
        {igLoading || fbLoading || twLoading || liLoading ? (
          <Box sx={{ height: '500px' }}>
            <Box className={classes.boxLoading}>
              <CircularProgress />
            </Box>
          </Box>
        ) : (
          <>
            <Box sx={{ width: '100%' }}>
              {postId && !(igLoading || fbLoading || twLoading || liLoading) ? (
                <video muted ref={onVideoChangeRef} style={{ width: '100%' }} crossOrigin="anonymous">
                  <source src={memoPostVideo} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <video muted ref={onVideoChangeRef} style={{ width: '100%' }} crossOrigin="anonymous">
                  <source src={`${values.image}&cache=${Date.parse(new Date().toDateString())}`} />
                  Your browser does not support the video tag.
                </video>
              )}

              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </Box>
            <Slider
              defaultValue={0}
              value={mediaFrameSec}
              step={1}
              marks
              min={0}
              max={vidMax}
              valueLabelDisplay="auto"
              onChange={handleChangeSeconds}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button type="button" disableElevation variant="contained" onClick={() => handleSaveThumbnail()}>
          Save
        </Button>
      </DialogActions>
    </>
  );
};

export default ChooseVideoCover;
