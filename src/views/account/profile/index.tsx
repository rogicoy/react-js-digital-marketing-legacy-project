/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { connect } from 'react-redux';
import Container from './Container';

const makeMapStateToProps = () => (state: any) => ({});

const actionCreators = {};

const AccountProfile = connect(makeMapStateToProps, actionCreators)(Container);

export default AccountProfile;
