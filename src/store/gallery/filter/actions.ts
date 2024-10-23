/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { createAction } from 'typesafe-actions';
import * as types from './types';
import { Tag } from '../main/models';

export const updateSelectedTags = createAction(types.UPDATE_SELECTED_TAGS, (tags: Tag[]) => tags)();

export const makeUpdateSelectedTags = (tags: Tag[]) => updateSelectedTags(tags);
