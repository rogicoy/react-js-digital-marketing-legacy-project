/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { connect } from 'react-redux';
import * as selectors from '../../../store/account/socials/selectors';
import * as actions from '../../../store/account/socials/actions';
import { SocialsApiRequest } from '../../../store/account/socials/models';
import Container from './Container';

const makeMapStateToProps = () => (state: any) => ({
  root: selectors.rootState(state),
  anotherProp: selectors.makeFormattedRequests()(state)
});

const actionCreators = {
  doCallSocialsApi: (request: SocialsApiRequest) => actions.makeCallSocialsApi(request),
  doUpdateData: (data: string) => actions.makeUpdateData(data)
};

const AccountSocials = connect(makeMapStateToProps, actionCreators)(Container);

export default AccountSocials;
