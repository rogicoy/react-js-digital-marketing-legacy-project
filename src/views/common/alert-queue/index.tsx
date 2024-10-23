/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { connect } from 'react-redux';
import * as selectors from 'store/common/alert-queue/selectors';
import * as actions from 'store/common/alert-queue/actions';
import Container from './Container';

const makeMapStateToProps = () => (state: any) => ({
  topAlert: selectors.makeGetTopAlert()(state),
  isOpenAlert: selectors.isOpenAlert(state)
});
const actionCreators = {
  doOpenAlert: (open: boolean) => actions.makeOpenAlert(open),
  doDequeueAlert: () => actions.makeDequeueAlert()
};

const AlertQueue = connect(makeMapStateToProps, actionCreators)(Container);

export default AlertQueue;
