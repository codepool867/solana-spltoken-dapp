import type { FC, PropsWithChildren } from "react";
import React from "react";

import type { ActionProps, AOSProps, ExtraTWClassProps } from "utils";

// row layout: flex flex-row
const Row: FC<PropsWithChildren & ExtraTWClassProps & AOSProps & ActionProps> = ({ children, className, animate, delay, action }) => {
  return (
    <div data-aos={animate} data-aos-delay={delay} className={`flex flex-row ${className}`} onClick={action}>
      {children}
    </div>
  );
};

export default Row;
