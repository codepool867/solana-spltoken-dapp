import type { MouseEventHandler, MutableRefObject } from "react";
import type { StaticImageData } from "next/image";

// types for action like onClick/onChange ...
export interface ActionProps {
  action?: () => void;
}

// types for aos
export interface AOSProps {
  animate?: string;
  delay?: string | number;
  duration?: string | number;
  offset?: string | number;
}

export interface BalanceProps {
  [key: string]: number;
}

export interface BorderProps {
  vertical?: boolean;
}

// types for button
export interface ButtonProps {
  action?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "reset" | "submit" | undefined;
}

// extra class props to customize components
export interface ExtraTWClassProps {
  className?: string;
}

// search props
export interface SearchProps {
  searchValue: string;
}

// types for template view(i.e. 404, 500, Coming Soon Page)
export interface TemplateViewProps {
  title: string;
}

// types for ref
export interface RefPros {
  ref: MutableRefObject<null>;
}

// types for notification
export interface NotificationProps {
  type?: string;
  title: string;
  message: string;
  link?: string;
}

// types for exchange
export interface ExchangeProps {
  direction: number;
}

// types for pair of pool detail
export interface PairProps {
  name: string;
  symbol: string;
  icon: StaticImageData | string;
  alt: string;
  mint: string;
  balance?: number;
}

// types for pair array of pool detail
export interface PoolDetailProps {
  poolDetail: PoolProps;
}

// types for page seo
export interface PageProps {
  name: string;
}

export interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
}

// types for custom image
export interface ImageLoaderProps {
  src: string;
  width?: number;
  height?: number;
}

export interface ImagePlaceholderProps {
  placeholder?: "empty" | "blur";
  blurDataURL?: string;
}

export interface ImageProps {
  src?: StaticImageData | string;
  alt?: string;
  width?: number;
  height?: number;
  mode?: "intrinsic" | "fill";
  oFit?: "cover" | "contain" | "none" | "fill";
  quality?: string | number;
  loadOption?: "lazy" | "eager" | undefined;
  oPosition?: "top" | "bottom" | "right" | "left" | "initial";
  priority?: boolean;
  [key: string]: any;
}

export interface GridStatusProps {
  action?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  gridStatus: boolean;
}

export interface PoolProps {
  pairs: PairProps[];
  liquidity: number;
  volume_30d: number;
  fees_30d: number;
  apr_30d: number;
  public_key: string;
  address: string;
  name: string;
}
export interface PoolMobileProps {
  searchValue: string;
  gridStatus: boolean;
}
