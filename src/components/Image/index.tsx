import React, { type FC } from "react";
import Image from "next/image";

import type { ImageProps, ImagePlaceholderProps } from "utils";
import { isEmpty, loadImage } from "utils";

// customize next image
const ImageComponent: FC<ImageProps> = ({
  src = "",
  alt = "No Image!",
  width = 0,
  height = 0,
  mode = "intrinsic",
  oFit = "fill",
  quality = 75,
  priority = false,
  loadOption,
  oPosition = "initial",
  ...props
}) => {
  if (isEmpty(src)) {
    return <div style={{ width: width, height: height }} className="flex items-center justify-center"></div>;
  }

  const blurUrl = (typeof src === "object" ? src.src : src) + "?q=10";
  const blurProperty: ImagePlaceholderProps = width < 40 || height < 40 ? {} : { placeholder: "blur", blurDataURL: blurUrl };

  return mode === "fill" ? (
    <div className="absolute top-0 bottom-0 h-full w-full" {...props}>
      <div className="relative h-full w-full">
        <Image
          loader={loadImage}
          src={src}
          alt={alt}
          draggable={false}
          layout={mode}
          objectFit={oFit}
          quality={quality}
          loading={loadOption}
          priority={priority}
          objectPosition={oPosition}
          {...blurProperty}
        />
      </div>
    </div>
  ) : (
    <Image
      loader={loadImage}
      src={src}
      alt={alt}
      width={width}
      height={height}
      draggable={false}
      layout={mode}
      objectFit={oFit}
      quality={quality}
      loading={loadOption}
      priority={priority}
      objectPosition={oPosition}
      {...blurProperty}
      {...props}
    />
  );
};

export default ImageComponent;
