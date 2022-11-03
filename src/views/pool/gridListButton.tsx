import type { FC, PropsWithChildren } from "react";
import React from "react";

import type { ButtonProps, ExtraTWClassProps, GridStatusProps } from "utils";

const GridListButton: FC<GridStatusProps> = ({ action, isLoading, gridStatus }) => {
  let gridButtonStyle = " p-2 rounded-md cursor-pointer text-center disabled:bg-primary_gradient disabled:pointer-events-none mr-1";
  let listButtonStyle = " p-2 rounded-md cursor-pointer text-center disabled:bg-primary_gradient disabled:pointer-events-none";
  if (gridStatus) {
    gridButtonStyle = gridButtonStyle + " bg-primary_gradient_hover";
  } else {
    listButtonStyle = listButtonStyle + " bg-primary_gradient_hover";
  }
  return (
    <>
      <button onClick={action} className={gridButtonStyle} disabled={gridStatus}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="fill-current w-8 h-8"
        >
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      </button>
      <button onClick={action} className={listButtonStyle} disabled={!gridStatus}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="fill-current w-8 h-8"
        >
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      </button>
    </>
  );
};

export default GridListButton;
