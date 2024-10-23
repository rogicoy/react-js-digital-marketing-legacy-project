/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { connect } from 'react-redux';
import * as selectors from '../../../store/account/billing/selectors';
import * as actions from '../../../store/account/billing/actions';
import { BillingApiRequest } from '../../../store/account/billing/models';
import Container from './Container';

const makeMapStateToProps = () => (state: any) => ({
  root: selectors.rootState(state),
  anotherProp: selectors.makeFormattedRequests()(state)
});

const actionCreators = {
  doCallBillingApi: (request: BillingApiRequest) => actions.makeCallBillingApi(request),
  doUpdateData: (data: string) => actions.makeUpdateData(data)
};

const AccountBilling = connect(makeMapStateToProps, actionCreators)(Container);

export default AccountBilling;
