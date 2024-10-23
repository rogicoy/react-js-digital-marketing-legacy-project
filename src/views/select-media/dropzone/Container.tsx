/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/* eslint-disable react/jsx-curly-brace-presence */
import { useState, useMemo, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Grid, Box, Typography, CardMedia, Button, CircularProgress } from '@material-ui/core';
import { FileRejection, useDropzone } from 'react-dropzone';
import { DropzoneFile } from 'store/gallery/dropzone/models';
import { DropzoneProps } from './types';
import refKey from './refKey';

const maxImageSize = 400000000;
export const imageFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'];
export const videoFileTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv'];
const fileTypes = [...videoFileTypes, ...imageFileTypes];

const Container = (props: DropzoneProps) => {
  const {
    state,
    violationCount,
    successfulUploadCount,
    failedUploadCount,
    onUploadSuccess,
    onUploadOngoing,
    onUploadFailed,
    doEnqueueErrorAlert,
    doEnqueueInfoAlert,
    doAddFiles,
    doClearFiles,
    doUploadFile
  } = props;
  const [acceptedFiles, setAcceptedFiles] = useState<any[]>([]);
  const theme = useTheme();

  const baseStyle = {
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

  useEffect(() => {
    setAcceptedFiles([]);
    doClearFiles();
  }, []);

  useEffect(() => {
    if (state.files.length === acceptedFiles.length) {
      if (violationCount.filesWithInvalidDimension > 0 || violationCount.filesWithInvalidWidthOnly > 0) {
        doEnqueueErrorAlert('Your image is too wide. The max width is 3000px');
      }
      if (violationCount.filesWithInvalidHeightOnly > 0) {
        doEnqueueErrorAlert('Your image is too tall. The max height is 3000px');
      }
    }
  }, [state.files]);

  useEffect(() => {
    if (successfulUploadCount > 0 && onUploadSuccess) {
      onUploadSuccess();
    }
  }, [successfulUploadCount]);

  useEffect(() => {
    if (failedUploadCount > 0 && onUploadFailed) {
      onUploadFailed();
    }
  }, [failedUploadCount]);

  const loadImage = async (url: string) => {
    const image = new Image();
    return new Promise((resolve, reject) => {
      image.onload = async () =>
        resolve({
          width: image.width,
          height: image.height
        });
      image.src = url;
    });
  };

  const loadVideo = async (url: string) => {
    const video = document.createElement('video');
    return new Promise((resolve) => {
      video.addEventListener('loadedmetadata', () => {
        resolve({
          width: video.videoWidth,
          height: video.videoHeight
        });
      });
      video.src = url;
    });
  };

  const onDropAccepted = async (files: File[]) => {
    doClearFiles();

    const filesToUpload: Promise<DropzoneFile>[] = files.map((file: File, index: number) => {
      const url = URL.createObjectURL(file);

      if (videoFileTypes.includes(file.type)) {
        return loadVideo(url).then((dimension: any) => ({
          url,
          index,
          name: file.name,
          ref: refKey.create(6),
          width: dimension.width,
          height: dimension.height,
          uploadStatus: 'unuploaded'
        }));
      }
      return loadImage(url).then((dimension: any) => ({
        url,
        index,
        name: file.name,
        ref: refKey.create(6),
        width: dimension.width,
        height: dimension.height,
        uploadStatus: 'unuploaded'
      }));
    });
    const validatedFiles = await Promise.all(filesToUpload);

    doAddFiles(validatedFiles);
    setAcceptedFiles(files);
    doEnqueueInfoAlert('Uploading your files.');

    if (onUploadOngoing) {
      onUploadOngoing();
    }

    validatedFiles.forEach((file) => {
      doUploadFile(file.ref, files[file.index]);
    });
  };

  const countErrorsByCode = (rejects: FileRejection[], errorCode: string) =>
    rejects.filter((reject) => reject.errors[0].code === errorCode).length;

  const onDropRejected = (rejects: FileRejection[]) => {
    if (countErrorsByCode(rejects, 'file-invalid-type') > 0) {
      doEnqueueErrorAlert('You’re image type is not supported. Please upload .jpeg, .bmp, .png or .gif');
    }
    if (countErrorsByCode(rejects, 'file-too-large') > 0) {
      doEnqueueErrorAlert('Your image is too large. The max size is 4MB.');
    }
  };

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDropAccepted,
    onDropRejected,
    accept: fileTypes,
    maxSize: maxImageSize
  });

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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box component="div" {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <Grid container justifyContent="center" alignContent="center" height="100px">
            <Grid item>
              <Typography variant="h3" sx={{ color: theme.palette.grey[500] }}>
                {"Drag 'n' drop your files here, or click to upload."}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Container;
