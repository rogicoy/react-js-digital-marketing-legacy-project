/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { connect } from 'react-redux';
import * as selectors from 'store/ads/reports/selectors';
import * as actions from 'store/ads/reports/actions';
import Container from './Container';

const makeMapStateToProps = () => (state: any) => ({
  root: selectors.rootState(state)
});

const actionCreators = {
  doCallReportsApi: () => actions.makeCallAdsReportsApi()
};

const Reports = connect(makeMapStateToProps, actionCreators)(Container);

export default Reports;
