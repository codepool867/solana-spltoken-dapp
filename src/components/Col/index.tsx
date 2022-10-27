import type { FC, PropsWithChildren } from "react";
import React from "react";

import type { AOSProps, ExtraTWClassProps } from "utils";

// col layout: flex flex-col
const Col: FC<PropsWithChildren & ExtraTWClassProps & AOSProps> = ({ children, className, animate, delay }) => {
  return (
    <div data-aos={animate} data-aos-delay={delay} className={`flex flex-col ${className}`}>
      {children}
    </div>
  );
};

export default Col;
