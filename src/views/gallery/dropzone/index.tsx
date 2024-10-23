/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { connect } from 'react-redux';
import * as selectors from 'store/gallery/dropzone/selectors';
import * as actions from 'store/gallery/dropzone/actions';
import { DropzoneFile } from 'store/gallery/dropzone/models';
import * as alertQueueActions from 'store/common/alert-queue/actions';
import Container from './Container';

const makeMapStateToProps = () => (state: any) => ({
  state: selectors.rootState(state),
  violationCount: selectors.makeCollateViolationCount()(state),
  validFiles: selectors.makeGetValidFiles()(state),
  successfulUploadCount: selectors.makeGetSuccessfulUploads()(state).length,
  failedUploadCount: selectors.makeGetFailedUploads()(state).length,
  ongoingUploadCount: selectors.makeGetOngoingUploads()(state).length
});

const actionCreators = {
  doEnqueueErrorAlert: (message: string) => alertQueueActions.makeEnqueueErrorAlert('gal', message),
  doEnqueueInfoAlert: (message: string) => alertQueueActions.makeEnqueueInfoAlert('gal', message),
  doAddFiles: (files: DropzoneFile[]) => actions.makeAddFiles(files),
  doClearFiles: () => actions.makeClearFiles(),
  doUploadFile: (ref: string, file: File) => actions.makeCallFileUploadApi({ ref, file })
};

const GalleryDropzone = connect(makeMapStateToProps, actionCreators)(Container);

export default GalleryDropzone;
