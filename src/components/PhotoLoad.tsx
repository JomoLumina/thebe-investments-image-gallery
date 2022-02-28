import React, { forwardRef, ImgHTMLAttributes, LegacyRef, useEffect, useState } from "react";
interface PhotoLoadProps extends ImgHTMLAttributes<HTMLImageElement> {
  placeholderImg?: string;
}
const PhotoLoad = forwardRef(({ src, placeholderImg, ...props }: PhotoLoadProps, ref: LegacyRef<HTMLImageElement>) => {
  const [imgSrc, setSrc] = useState(placeholderImg || src);
  useEffect(() => {
    const img = new Image();
    img.src = src as string;
    img.addEventListener("load", () => {
      setSrc(src);
    });
  }, [src, placeholderImg]);
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props} src={imgSrc} ref={ref} />;
});

export default PhotoLoad;