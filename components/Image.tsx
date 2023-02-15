import React, { useState, useEffect } from 'react';
import { ImageProps } from 'next/image';

// TODO: <NextImage/> 적용해보기
interface Props extends Omit<ImageProps, 'src'> {
  src?: string | null;
}
const Image = ({
  layout,
  width,
  height,
  src,
  objectFit,
  alt,
  ...props
}: Props) => {
  const [err, setErr] = useState<boolean | null>(false);
  const errImg = '/images/no_img.jpg';

  useEffect(() => {
    if (err) {
      setErr(null);
    }
  }, [src]);

  return (
    <img
      {...props}
      src={err ? errImg : src || errImg}
      css={{
        width: layout === 'fill' ? '100%' : width,
        height: layout === 'fill' ? '100%' : height,
        objectFit: objectFit || 'cover', // cover/fill
      }}
      alt={alt}
    />
  );
};
export default Image;
