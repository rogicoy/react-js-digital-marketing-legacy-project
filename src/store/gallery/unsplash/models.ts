/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { ImageStatus } from './types';

export type UnsplashFilterInput = {
  query: string;
  orientation?: string;
  page: number;
  perPage: number;
};

export type UnsplashApiRequest = {
  filter: UnsplashFilterInput;
};

export type UnsplashImage = {
  id: string;
  description: string;
  urlRegular: string;
  urlRaw: string;
  status: ImageStatus;
  width: number;
  height: number;
};

export type UnsplashApiResponse = {
  images: UnsplashImage[];
};

export type UnsplashUploadApiRequest = {
  link: string;
};

export type UnsplashUploadApiResponse = {
  link: string;
  payload: any;
};

export type UnsplashState = {
  images: UnsplashImage[];
  filter: UnsplashFilterInput;
};
