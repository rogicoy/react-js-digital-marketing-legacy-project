/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { UnsplashState, UnsplashApiRequest, UnsplashImage, UnsplashUploadApiRequest } from 'store/gallery/unsplash/models';
import { GalleryMedia } from 'store/gallery/main/models';
import { ImageStatus } from 'store/gallery/unsplash/types';

export type GalleryUnsplashProps = {
  open: boolean;
  state: UnsplashState;
  addedUnsplashImages: GalleryMedia[];
  doOnClose: () => void;
  doCallUnsplashApi: (request: UnsplashApiRequest) => void;
  doCallUnsplashUploadApi: (request: UnsplashUploadApiRequest) => void;
  doChangeUnsplashImageStatus: (id: string, status: ImageStatus) => void;
  doClearUnsplashImages: () => void;
};

export type ImageMasonryAction = {
  handleUploadLink: (id: string, link: string) => void;
  updateImageStatus: (unsplashId: string) => void;
};

export type ImageMasonryProps = {
  images: UnsplashImage[];
  action: ImageMasonryAction;
};

export type ImageMasonryItemProps = {
  id: string;
  urlRegular: string;
  urlRaw: string;
  description: string;
  width: number;
  height: number;
  status: string;
  action: ImageMasonryAction;
};
