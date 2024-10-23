/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { connect } from 'react-redux';
import * as selectors from 'store/ads/new-ad/selectors';
import * as actions from 'store/ads/new-ad/actions';
import { NewAdApiRequest } from 'store/ads/new-ad/models';
import Container from './Container';

const makeMapStateToProps = () => (state: any) => ({
  root: selectors.rootState(state),
  anotherProp: selectors.makeFormattedRequests()(state)
});

const actionCreators = {
  doCallNewAdApi: (request: NewAdApiRequest) => actions.makeCallNewAdApi(request),
  doUpdateData: (data: string) => actions.makeUpdateData(data),
  doMakeFacebookCampaign: (request: any) => actions.makeFacebookCampaign(request)
};

const NewAd = connect(makeMapStateToProps, actionCreators)(Container);

export default NewAd;
