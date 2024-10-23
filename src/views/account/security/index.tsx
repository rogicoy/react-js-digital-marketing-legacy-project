/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { connect } from 'react-redux';
import * as selectors from '../../../store/account/security/selectors';
import * as actions from '../../../store/account/security/actions';
import { SecurityApiRequest } from '../../../store/account/security/models';
import Container from './Container';

const makeMapStateToProps = () => (state: any) => ({
  root: selectors.rootState(state),
  anotherProp: selectors.makeFormattedRequests()(state)
});

const actionCreators = {
  doCallSecurityApi: (request: SecurityApiRequest) => actions.makeCallSecurityApi(request),
  doUpdateData: (data: string) => actions.makeUpdateData(data)
};

const AccountSecurity = connect(makeMapStateToProps, actionCreators)(Container);

export default AccountSecurity;
