import type { FC, PropsWithChildren } from "react";
import React from "react";

import type { ButtonProps, ExtraTWClassProps } from "utils";

const Button: FC<PropsWithChildren & ButtonProps & ExtraTWClassProps> = ({ children, action, isLoading, type = "button", className }) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      onClick={action}
      className={`${
        isLoading && "opacity-70"
      } h-[54px] px-[30px] rounded-full bg-primary_gradient uppercase font-bold text-[16px] text-white ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
