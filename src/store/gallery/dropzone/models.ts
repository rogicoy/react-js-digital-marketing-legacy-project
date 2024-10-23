/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

export type DropzoneFile = {
  ref: string;
  url: string;
  name: string;
  index: number;
  width: number;
  height: number;
  uploadStatus: string;
  mimeType?: string;
};

export type DropzoneState = {
  files: DropzoneFile[];
};

export type DropzoneViolationCount = {
  // Number of files that has both invalid width and height.
  filesWithInvalidDimension: number;

  // Number of files that has invalid width only.
  filesWithInvalidWidthOnly: number;

  // Number of files that has invalid height only.
  filesWithInvalidHeightOnly: number;
};

export type FileUploadRequest = {
  ref: string;
  file: File;
};

export type FileUploadResponse = {
  ref: string;
};
