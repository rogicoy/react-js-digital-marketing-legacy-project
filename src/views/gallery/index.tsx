/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { connect } from 'react-redux';
import * as selectors from 'store/gallery/main/selectors';
import * as actions from 'store/gallery/main/actions';
import { GalleryView } from 'store/gallery/main/types';
import {
  GalleryMediasApiRequest,
  AddAccountTagApiRequest,
  DeleteAccountTagApiRequest,
  MediaTagApiRequest
} from 'store/gallery/main/models';
import Container from './Container';

const makeMapStateToProps = () => (state: any) => ({
  state: selectors.rootState(state),
  filterState: selectors.filterState(state),
  selectedMedias: selectors.makeFilterSelectedMedias()(state)
});

const actionCreators = {
  doCallGalleryMediasApi: (request: GalleryMediasApiRequest) => actions.makeCallGalleryMediasApi(request),
  doCallGalleryDeleteMediasApi: (mediaIds: string[]) => actions.makeCallGalleryDeleteMediasApi(mediaIds),
  doCallAccountTagsApi: () => actions.makeCallAccountTagsApi(),
  doCallAddAccountTagApi: (request: AddAccountTagApiRequest) => actions.makeCallAddAccountTagApi(request),
  doCallDeleteAccountTagApi: (request: DeleteAccountTagApiRequest) => actions.makeCallDeleteAccountTagApi(request),
  doCallAddMediaTagApi: (request: MediaTagApiRequest) => actions.makeCallAddMediaTagApi(request),
  doCallDeleteMediaTagApi: (request: MediaTagApiRequest) => actions.makeCallDeleteMediaTagApi(request),
  doClearDeleteMediasReqStatus: () => actions.makeClearDeleteMediasReqStatus(),
  doClearAddAccountTagReqStatus: () => actions.makeClearAddAccountTagReqStatus(),
  doClearDeleteAccountTagReqStatus: () => actions.makeClearDeleteAccountTagReqStatus(),
  doClearAddMediaTagReqStatus: (request: MediaTagApiRequest) => actions.makeClearAddMediaTagReqStatus(request),
  doClearDeleteMediaTagReqStatus: (request: MediaTagApiRequest) => actions.makeClearDeleteMediaTagReqStatus(request),
  doSwitchGalleryView: (view: GalleryView) => actions.makeSwitchGalleryView(view),
  doSelectGalleryMedia: (index: number) => actions.makeSelectGalleryMedia(index),
  doSelectAllGalleryMedia: () => actions.makeSelectAllGalleryMedia(),
  doUnselectAllGalleryMedia: () => actions.makeUnselectAllGalleryMedia(),
  doOpenUploadDropzone: (open: boolean) => actions.makeOpenUploadDropzone(open),
  doOpenUnsplashDialog: (open: boolean) => actions.makeOpenUnsplashDialog(open),
  doOpenManageTagsDialog: (open: boolean) => actions.makeOpenManageTagsDialog(open),
  doOpenMediaDetailsDialog: (index: number) => actions.makeOpenMediaDetailsDialog(index)
};

const Gallery = connect(makeMapStateToProps, actionCreators)(Container);

export default Gallery;
