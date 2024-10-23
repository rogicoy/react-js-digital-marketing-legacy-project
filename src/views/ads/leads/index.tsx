/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { connect } from 'react-redux';
import * as selectors from '../../../store/ads/leads/selectors';
import Container from './Container';

const makeMapStateToProps = () => (state: any) => ({
  root: selectors.rootState(state)
});

const actionCreators = {};

const AdsLeads = connect(makeMapStateToProps, actionCreators)(Container);

export default AdsLeads;
