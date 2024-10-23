/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

export const GET_SELECT_MEDIAS_API_REQUEST = 'gallery/GET_SELECT_MEDIAS_API_REQUEST';
export const GET_SELECT_MEDIAS_API_SUCCESS = 'gallery/GET_SELECT_MEDIAS_API_SUCCESS';
export const GET_SELECT_MEDIAS_API_FAILED = 'gallery/GET_SELECT_MEDIAS_API_FAILED';
export const SELECT_MEDIA_FILE = 'gallery/SELECT_MEDIA_FILE';
export const SELECT_MEDIA_FILES = 'gallery/SELECT_MEDIA_FILES';

export type SelectMediaFileType = 'image' | 'video';
export type SelectMediaFileStatus = 'unused' | 'posted' | 'scheduled';
export type SelectMediaFileSource = 'local' | 'unsplash';
export type RequestStatus = 'ongoing' | 'success' | 'failed' | undefined;
