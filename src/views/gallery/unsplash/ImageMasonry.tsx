/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useEffect, useState } from 'react';
import { ImageList } from '@material-ui/core';
import { UnsplashImage } from 'store/gallery/unsplash/models';
import { ImageMasonryProps } from './types';
import ImageMasonryItem from './ImageMasonryItem';

const IL_COLS = 3;
const IL_GAP = 20;

const ImageMasonry = (props: ImageMasonryProps) => {
  const { images, action } = props;
  const [itemWidth, setItemWidth] = useState(0);
  const ref = React.createRef<HTMLUListElement>();

  useEffect(() => {
    const clientWidth = ref.current?.clientWidth === undefined ? 0 : ref.current?.clientWidth;
    setItemWidth(Math.ceil(clientWidth / IL_COLS - IL_GAP));
  }, []);

  return (
    <ImageList ref={ref} variant="masonry" cols={IL_COLS} gap={IL_GAP}>
      {images.map((image: UnsplashImage) => (
        <ImageMasonryItem
          id={image.id}
          urlRegular={image.urlRegular}
          urlRaw={image.urlRaw}
          description={image.description}
          status={image.status}
          width={itemWidth}
          height={Math.ceil(image.height / (image.width / itemWidth))}
          action={action}
        />
      ))}
    </ImageList>
  );
};

export default ImageMasonry;
