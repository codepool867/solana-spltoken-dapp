import type { FC } from "react";
import React from "react";

import type { BorderProps, ExtraTWClassProps } from "utils";

// horizontal or vertical border based on vertical boolean props.
// i.e. if vertical is true, apply vertical border style. otherwise, apply horizontal border style.
// need to pass style like border color and more detail style as props via className of ExtraTWClassProps
const Border: FC<BorderProps & ExtraTWClassProps> = ({ vertical = false, className }) => {
  return <div className={`${vertical ? "w-px" : "border"} ${className}`} />;
};

export default Border;
