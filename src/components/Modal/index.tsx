import type { FC, PropsWithChildren } from "react";
import React from "react";

import mainActionStore from "store/mainActionStore";
import type { ExtraTWClassProps } from "utils";

// general modal component
const Modal: FC<PropsWithChildren & ExtraTWClassProps> = ({ children, className }) => {
  return (
    <div className="fixed inset-0 w-full h-screen z-[9998] overflow-hidden bg-white bg-opacity-20 backdrop-blur-[4px]">
      <div onClick={() => mainActionStore.setShowModal(false)} className="relative top-24 tablet:top-16 flex justify-center max-h-[900px]">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`animate-modal_mount w-[400px] mobile:w-[375px] last:w-[320px] p-[24px] bg-card_normal rounded-3xl shadow-xl ${className}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
