/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { connect } from 'react-redux';
import * as selectors from '../../../store/account/notifications/selectors';
import * as actions from '../../../store/account/notifications/actions';
import { NotificationsApiRequest } from '../../../store/account/notifications/models';
import Container from './Container';

const makeMapStateToProps = () => (state: any) => ({
  root: selectors.rootState(state),
  anotherProp: selectors.makeFormattedRequests()(state)
});

const actionCreators = {
  doCallNotificationsApi: (request: NotificationsApiRequest) => actions.makeCallNotificationsApi(request),
  doUpdateData: (data: string) => actions.makeUpdateData(data)
};

const AccountNotifications = connect(makeMapStateToProps, actionCreators)(Container);

export default AccountNotifications;
