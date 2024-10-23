/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { connect } from 'react-redux';
import * as selectors from '../../../store/account/business/selectors';
import * as actions from '../../../store/account/business/actions';
import { BusinessApiRequest } from '../../../store/account/business/models';
import Container from './Container';

const makeMapStateToProps = () => (state: any) => ({
  root: selectors.rootState(state),
  anotherProp: selectors.makeFormattedRequests()(state)
});

const actionCreators = {
  doCallBusinessApi: (request: BusinessApiRequest) => actions.makeCallBusinessApi(request),
  doUpdateData: (data: string) => actions.makeUpdateData(data)
};

const AccountBusiness = connect(makeMapStateToProps, actionCreators)(Container);

export default AccountBusiness;
