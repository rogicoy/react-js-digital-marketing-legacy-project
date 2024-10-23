/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { connect } from 'react-redux';
import * as actions from 'store/dashboard/actions';
import * as msgQueueActions from 'store/common/alert-queue/actions';
import { DashboardApiRequest } from 'store/dashboard/models';
import Container from './Container';

const makeMapStateToProps = () => (state: any) => ({});

const actionCreators = {
  doCallDashboardApi: (request: DashboardApiRequest) => actions.makeCallDashboardApi(request),
  doEnqueueErrorAlert: (messageKey: string) => msgQueueActions.makeEnqueueErrorAlert('das', messageKey),
  doEnqueueWarnAlert: (messageKey: string) => msgQueueActions.makeEnqueueWarningAlert('das', messageKey),
  doEnqueueSuccessAlert: (messageKey: string) => msgQueueActions.makeEnqueueSuccessAlert('das', messageKey),
  doEnqueueInfoAlert: (messageKey: string) => msgQueueActions.makeEnqueueInfoAlert('das', messageKey)
};

const Dashboard = connect(makeMapStateToProps, actionCreators)(Container);

export default Dashboard;
