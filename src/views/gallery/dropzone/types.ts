/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import * as models from 'store/gallery/dropzone/models';

export type DropzoneProps = {
  state: models.DropzoneState;
  violationCount: models.DropzoneViolationCount;
  validFiles: models.DropzoneFile[];
  successfulUploadCount: number;
  failedUploadCount: number;
  ongoingUploadCount: number;
  isOpen: boolean;
  onUploadSuccess?: () => void;
  onUploadOngoing?: () => void;
  onUploadFailed?: () => void;
  doEnqueueErrorAlert: (message: string) => void;
  doEnqueueInfoAlert: (message: string) => void;
  doAddFiles: (files: models.DropzoneFile[]) => void;
  doClearFiles: () => void;
  doUploadFile: (ref: string, file: File) => void;
};
