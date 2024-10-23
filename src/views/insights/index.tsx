/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { connect } from 'react-redux';
import * as selectors from '../../store/insights/selectors';
import * as actions from '../../store/insights/actions';
import { InsightsApiRequest } from '../../store/insights/models';
import Container from './Container';

const makeMapStateToProps = () => (state: any) => ({
  root: selectors.rootState(state),
  anotherProp: selectors.makeFormattedRequests()(state)
});

const actionCreators = {
  doCallInsightsApi: (request: InsightsApiRequest) => actions.makeCallInsightsApi(request),
  doUpdateData: (data: string) => actions.makeUpdateData(data)
};

const Insights = connect(makeMapStateToProps, actionCreators)(Container);

export default Insights;
