/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { connect } from 'react-redux';
import * as selectors from 'store/gallery/filter/selectors';
import * as actions from 'store/gallery/filter/actions';
import { Tag } from 'store/gallery/main/models';
import Container from './Container';

const makeMapStateToProps = () => (state: any) => ({
  selectedTags: selectors.getSelectedTags(state)
});

const actionCreators = {
  doUpdateSelectedTags: (tags: Tag[]) => actions.makeUpdateSelectedTags(tags)
};

const GalleryFilter = connect(makeMapStateToProps, actionCreators)(Container);

export default GalleryFilter;
