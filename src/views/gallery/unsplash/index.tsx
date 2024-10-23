/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { connect } from 'react-redux';
import * as selectors from 'store/gallery/unsplash/selectors';
import * as mainSelectors from 'store/gallery/main/selectors';
import * as actions from 'store/gallery/unsplash/actions';
import { UnsplashApiRequest, UnsplashUploadApiRequest } from 'store/gallery/unsplash/models';
import { ImageStatus } from 'store/gallery/unsplash/types';
import Container from './Container';

const makeMapStateToProps = () => (state: any) => ({
  state: selectors.rootState(state),
  addedUnsplashImages: mainSelectors.makeFilterUnsplashImages()(state)
});

const actionCreators = {
  doCallUnsplashApi: (request: UnsplashApiRequest) => actions.makeCallUnsplashApi(request),
  doCallUnsplashUploadApi: (request: UnsplashUploadApiRequest) => actions.makeCallUploadUnsplashApi(request),
  doClearUnsplashImages: () => actions.makeClearUnsplashImages(),
  doChangeUnsplashImageStatus: (id: string, status: ImageStatus) => actions.makeChangeUnsplashImageStatus(id, status)
};

const GalleryUnsplash = connect(makeMapStateToProps, actionCreators)(Container);

export default GalleryUnsplash;
