/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// import { addDays } from 'date-fns';
import produce, { Draft } from 'immer';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import { SchedulerState } from './models';

export const initState: SchedulerState = {
  requests: [],
  response: [],
  errors: [],
  openPost: false,
  editPost: false,
  openSuccess: {
    open: false,
    active: null
  },
  openEditor: false,
  cleared: false,
  posts: [],
  lastCreatedPost: null
};

const schedulerReducer = produce((draft: Draft<SchedulerState>, action: ActionType<typeof actions>): SchedulerState => {
  switch (action.type) {
    case getType(actions.getIgPosts.success):
      draft.posts = [...draft.posts, ...action.payload];
      return draft;
    case getType(actions.getIgPosts.failure):
      draft.errors.push(action.payload);
      return draft;
    case getType(actions.getFbPosts.success):
      draft.posts = [...draft.posts, ...action.payload];
      return draft;
    case getType(actions.getFbPosts.failure):
      draft.errors.push(action.payload);
      return draft;
    case getType(actions.getTwPosts.success):
      draft.posts = [...draft.posts, ...action.payload];
      return draft;
    case getType(actions.getTwPosts.failure):
      draft.errors.push(action.payload);
      return draft;
    case getType(actions.getLiPosts.success):
      draft.posts = [...draft.posts, ...action.payload];
      return draft;
    case getType(actions.getLiPosts.failure):
      draft.errors.push(action.payload);
      return draft;
    case getType(actions.createSchedulerPost.success):
      draft.lastCreatedPost = action.payload;
      draft.posts.push(action.payload);
      return draft;
    case getType(actions.createSchedulerPost.failure):
      draft.errors.push(action.payload);
      return draft;
    case getType(actions.openPostDialog):
      draft.openPost = action.payload;
      return draft;
    case getType(actions.openSuccessDialog):
      draft.openSuccess = action.payload;
      return draft;
    case getType(actions.openEditor):
      draft.openEditor = action.payload;
      return draft;
    case getType(actions.clearPosts):
      draft.posts = [];
      draft.cleared = action.payload;
      return draft;
    case getType(actions.editPostDialog):
      draft.editPost = action.payload;
      return draft;

    default:
      return draft;
  }
}, initState);

export default schedulerReducer;
