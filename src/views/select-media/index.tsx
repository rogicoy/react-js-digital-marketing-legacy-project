/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { connect } from 'react-redux';
import * as selectors from 'store/select-media/main/selectors';
import * as actions from 'store/select-media/main/actions';
import Container from './Container';
import { SelectMediaFile, SelectMediaFiles, SelectMediasApiRequest } from 'store/select-media/main/models';

const makeMapStateToProps = () => (state: any) => ({
  state: selectors.rootState(state),
  selectedMedias: selectors.makeFilterSelectedMedias()(state)
});

const actionCreators = {
  doCallSelectMediasApi: (request: SelectMediasApiRequest) => actions.makeCallSelectMediasApi(request),
  doMakeSelectMediaFile: (file: SelectMediaFile) => actions.makeSelectMediaFile(file),
  doMakeSelectMediaFiles: (file: SelectMediaFile) => actions.makeSelectMediaFiles(file)
};

const SelectMedia = connect(makeMapStateToProps, actionCreators)(Container);

export default SelectMedia;
