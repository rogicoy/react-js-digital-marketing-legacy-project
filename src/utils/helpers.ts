/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import imageToBase64 from 'image-to-base64/browser';

const textLowerCase = (value: string) => {
  const text = value.replace('_', ' ');
  return text.toLowerCase();
};

const addDecimalZero = (totalToAdd: number | string) => {
  let total: number | string = totalToAdd;
  const totalStr = total.toString();

  if (!totalStr.includes('.')) {
    total = `${total}.00`;
  }

  return total;
};

const dataURLtoBlob = (dataurl: any) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  // eslint-disable-next-line no-plusplus
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

const getBase64 = async (image: string) =>
  new Promise((resolve, reject) => {
    imageToBase64(image)
      .then((response: any) => {
        resolve(`data:image/png;base64, ${response}`);
      })
      .catch(reject);
  });

const generateVideoThumbnail = (file: File) =>
  new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const video = document.createElement('video');

    // this is important
    video.crossOrigin = 'anonymous';
    video.autoplay = true;
    video.muted = true;
    video.src = fileToObjectUrl(`${file}&cache=${Date.parse(new Date().toDateString())}`);

    video.onloadeddata = () => {
      const ctx = canvas.getContext('2d');

      // video.currentTime = 12;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      video.pause();
      return resolve(canvas.toDataURL('image/png'));
    };
  });

const fileToObjectUrl = (image: File | string) => (image instanceof File ? URL.createObjectURL(image) : image);

const getUniqueListBy = (arr: any[], key: any) => Array.from(new Map(arr.map((item) => [item[key], item])).values());

const helpers = {
  textLowerCase,
  addDecimalZero,
  dataURLtoBlob,
  getBase64,
  generateVideoThumbnail,
  fileToObjectUrl,
  getUniqueListBy
};

export default helpers;
