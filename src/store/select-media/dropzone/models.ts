/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

export type SelectMediaDropzoneFile = {
  ref: string;
  url: string;
  name: string;
  index: number;
  width: number;
  height: number;
  uploadStatus: string;
};

export type SelectMediaDropzoneState = {
  files: SelectMediaDropzoneFile[];
};

export type SelectMediaDropzoneViolationCount = {
  // Number of files that has both invalid width and height.
  filesWithInvalidDimension: number;

  // Number of files that has invalid width only.
  filesWithInvalidWidthOnly: number;

  // Number of files that has invalid height only.
  filesWithInvalidHeightOnly: number;
};

export type SelectMediaFileUploadRequest = {
  ref: string;
  file: File;
};

export type SelectMediaFileUploadResponse = {
  ref: string;
};
