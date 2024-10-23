/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

export const GET_UNSPLASH_API_REQUEST = 'gallery/unsplash/GET_UNSPLASH_API_REQUEST';
export const GET_UNSPLASH_API_SUCCESS = 'gallery/unsplash/GET_UNSPLASH_API_SUCCESS';
export const GET_UNSPLASH_API_FAILED = 'gallery/unsplash/GET_UNSPLASH_API_FAILED';
export const CLEAR_UNSPLASH_IMAGES = 'gallery/unsplash/CLEAR_UNSPLASH_IMAGES';
export const UPLOAD_UNSPLASH_API_REQUEST = 'gallery/unsplash/UPLOAD_UNSPLASH_API_REQUEST';
export const UPLOAD_UNSPLASH_API_SUCCESS = 'gallery/unsplash/UPLOAD_UNSPLASH_API_SUCCESS';
export const UPLOAD_UNSPLASH_API_FAILED = 'gallery/unsplash/UPLOAD_UNSPLASH_API_FAILED';
export const CHANGE_IMAGE_STATUS = 'gallery/unsplash/CHANGE_IMAGE_STATUS';

export type ImageStatus = 'added' | 'unused' | 'uploading';
