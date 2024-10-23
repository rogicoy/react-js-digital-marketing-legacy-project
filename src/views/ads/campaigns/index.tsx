/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { connect } from 'react-redux';
import * as selectors from '../../../store/ads/campaigns/selectors';
import * as actions from '../../../store/ads/campaigns/actions';
import { AdsCampaignsApiRequest } from '../../../store/ads/campaigns/models';
import Container from './Container';

const makeMapStateToProps = () => (state: any) => ({
  root: selectors.rootState(state),
  anotherProp: selectors.makeFormattedRequests()(state)
});

const actionCreators = {
  doCallAdsCampaignsApi: (request: AdsCampaignsApiRequest) => actions.makeCallAdsCampaignsApi(request),
  doUpdateData: (data: string) => actions.makeUpdateData(data)
};

const AdsCampaigns = connect(makeMapStateToProps, actionCreators)(Container);

export default AdsCampaigns;
