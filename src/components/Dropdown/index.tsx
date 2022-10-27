import type { FC, PropsWithChildren } from "react";
import React from "react";

import type { ExtraTWClassProps } from "utils";

// todo: dropdown component
const Dropdown: FC<PropsWithChildren & ExtraTWClassProps> = ({ children, className }) => {
  return <div className={`relative cursor-pointer ${className}`}>{children}</div>;
};

export default Dropdown;
