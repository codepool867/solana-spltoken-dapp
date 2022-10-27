import type { FC, PropsWithChildren } from "react";
import React, { useEffect } from "react";
import AOS from "aos";
import type { ActionProps, AOSProps, ExtraTWClassProps } from "utils";

// grid layout: grid
const Grid: FC<PropsWithChildren & ExtraTWClassProps & AOSProps & ActionProps> = ({ children, className, animate, delay, action }) => {
  useEffect(() => {
    AOS.refresh();
  }, [className]);
  return (
    <div data-aos={animate} data-aos-delay={delay} className={`grid ${className}`} onClick={action}>
      {children}
    </div>
  );
};

export default Grid;
