/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { connect } from 'react-redux';
import * as selectors from 'store/scheduler/selectors';
import * as actions from 'store/scheduler/actions';
import {
  CreateSchedulerIgPostRequest,
  CreateSchedulerFbPostRequest,
  CreateSchedulerPostRequest,
  GetSchedulerPostsRequest,
  GetIgPoststRequest,
  GetFbPoststRequest,
  GetTwPoststRequest,
  GetLiPoststRequest
} from 'store/scheduler/models';
import Container from './Container';
import { ISocialType } from 'types';

const makeMapStateToProps = () => (state: any) => ({
  state: selectors.rootState(state)
});

const actionCreators = {
  doGetSchedulerPosts: (request: GetSchedulerPostsRequest) => actions.makeGetSchedulerPosts(request),
  doGetIgPosts: (request: GetIgPoststRequest) => actions.makeGetIgPosts(request),
  doGetFbPosts: (request: GetFbPoststRequest) => actions.makeGetFbPosts(request),
  doGetTwPosts: (request: GetTwPoststRequest) => actions.makeGetTwPosts(request),
  doGetLiPosts: (request: GetLiPoststRequest) => actions.makeGetLiPosts(request),
  doCreateSchedulerPost: (request: CreateSchedulerPostRequest) => actions.makeCreateSchedulerPost(request),
  doCreateSchedulerIgPost: (request: CreateSchedulerIgPostRequest) => actions.makeCreateSchedulerIgPost(request),
  doCreateSchedulerFbPost: (request: CreateSchedulerFbPostRequest) => actions.makeCreateSchedulerFbPost(request),
  doOpenPostDialog: (open: boolean) => actions.makeOpenPostDialog(open),
  doOpenSuccessDialog: (open: boolean, active: ISocialType | null) => actions.makeOpenSuccessDialog(open, active),
  doClearPosts: (cleared: boolean) => actions.makeClearPosts(cleared),
  doEditPostDialog: (open: boolean) => actions.makeEditPostDialog(open)
};

const Scheduler = connect(makeMapStateToProps, actionCreators)(Container);

export default Scheduler;
