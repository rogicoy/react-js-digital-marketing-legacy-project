/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

export const GET_GALLERY_MEDIAS_API_REQUEST = 'gallery/GET_GALLERY_MEDIAS_API_REQUEST';
export const GET_GALLERY_MEDIAS_API_SUCCESS = 'gallery/GET_GALLERY_MEDIAS_API_SUCCESS';
export const GET_GALLERY_MEDIAS_API_FAILED = 'gallery/GET_GALLERY_MEDIAS_API_FAILED';
export const DELETE_GALLERY_MEDIAS_API_REQUEST = 'gallery/DELETE_GALLERY_MEDIAS_API_REQUEST';
export const DELETE_GALLERY_MEDIAS_API_SUCCESS = 'gallery/DELETE_GALLERY_MEDIAS_API_SUCCESS';
export const DELETE_GALLERY_MEDIAS_API_FAILED = 'gallery/DELETE_GALLERY_MEDIAS_API_FAILED';
export const CLEAR_DELETE_MEDIAS_REQ_STATUS = 'gallery/CLEAR_DELETE_MEDIAS_REQ_STATUS';
export const GET_ACCOUNT_TAGS_API_REQUEST = 'gallery/GET_ACCOUNT_TAGS_API_REQUEST';
export const GET_ACCOUNT_TAGS_API_SUCCESS = 'gallery/GET_ACCOUNT_TAGS_API_SUCCESS';
export const GET_ACCOUNT_TAGS_API_FAILED = 'gallery/GET_ACCOUNT_TAGS_API_FAILED';
export const ADD_ACCOUNT_TAG_API_REQUEST = 'gallery/ADD_ACCOUNT_TAG_API_REQUEST';
export const ADD_ACCOUNT_TAG_API_SUCCESS = 'gallery/ADD_ACCOUNT_TAG_API_SUCCESS';
export const ADD_ACCOUNT_TAG_API_FAILED = 'gallery/ADD_ACCOUNT_TAG_API_FAILED';
export const CLEAR_ADD_ACCOUNT_TAG_REQ_STATUS = 'gallery/CLEAR_ADD_ACCOUNT_TAG_REQ_STATUS';
export const DELETE_ACCOUNT_TAG_API_REQUEST = 'gallery/DELETE_ACCOUNT_TAG_API_REQUEST';
export const DELETE_ACCOUNT_TAG_API_SUCCESS = 'gallery/DELETE_ACCOUNT_TAG_API_SUCCESS';
export const DELETE_ACCOUNT_TAG_API_FAILED = 'gallery/DELETE_ACCOUNT_TAG_API_FAILED';
export const CLEAR_DELETE_ACCOUNT_TAG_REQ_STATUS = 'gallery/CLEAR_DELETE_ACCOUNT_TAG_REQ_STATUS';
export const ADD_MEDIA_TAG_API_REQUEST = 'gallery/ADD_MEDIA_TAG_API_REQUEST';
export const ADD_MEDIA_TAG_API_SUCCESS = 'gallery/ADD_MEDIA_TAG_API_SUCCESS';
export const ADD_MEDIA_TAG_API_FAILED = 'gallery/ADD_MEDIA_TAG_API_FAILED';
export const CLEAR_ADD_MEDIA_TAG_REQ_STATUS = 'gallery/CLEAR_ADD_MEDIA_TAG_REQ_STATUS';
export const DELETE_MEDIA_TAG_API_REQUEST = 'gallery/DELETE_MEDIA_TAG_API_REQUEST';
export const DELETE_MEDIA_TAG_API_SUCCESS = 'gallery/DELETE_MEDIA_TAG_API_SUCCESS';
export const DELETE_MEDIA_TAG_API_FAILED = 'gallery/DELETE_MEDIA_TAG_API_FAILED';
export const CLEAR_DELETE_MEDIA_TAG_REQ_STATUS = 'gallery/CLEAR_DELETE_MEDIA_TAG_REQ_STATUS';
export const REFRESH_MEDIA_TAGS = 'gallery/REFRESH_MEDIA_TAGS';
export const SWITCH_GALLERY_VIEW = 'gallery/SWITCH_GALLERY_VIEW';
export const SELECT_GALLERY_MEDIA = 'gallery/SELECT_GALLERY_MEDIA';
export const SELECT_ALL_GALLERY_MEDIA = 'gallery/SELECT_ALL_GALLERY_MEDIA';
export const UNSELECT_ALL_GALLERY_MEDIA = 'gallery/UNSELECT_ALL_GALLERY_MEDIA';
export const OPEN_UPLOAD_DROPZONE = 'gallery/OPEN_UPLOAD_DROPZONE';
export const OPEN_UNSPLASH_DIALOG = 'gallery/OPEN_UNSPLASH_DIALOG';
export const OPEN_MANAGE_TAGS_DIALOG = 'gallery/OPEN_MANAGE_TAGS_DIALOG';
export const OPEN_MEDIA_DETAILS_DIALOG = 'gallery/OPEN_MEDIA_DETAILS_DIALOG';

export type GalleryView = 'grid' | 'list';
export type MediaType = 'image' | 'video';
export type MediaStatus = 'unused' | 'posted' | 'scheduled';
export type MediaSource = 'local' | 'unsplash';
export type RequestStatus = 'ongoing' | 'success' | 'failed' | undefined;
