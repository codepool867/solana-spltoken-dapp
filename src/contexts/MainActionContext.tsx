import type { FC, PropsWithChildren } from "react";
import React, { createContext, useContext, useState } from "react";

export interface MainActionContextProp {
  index: number;
  setIndex: (value: number) => void;
  showModal: boolean | string;
  setShowModal: (value: boolean | string) => void;
  isTXLoading: boolean;
  setIsTXLoading: (value: boolean) => void;
  isActionLoading: boolean;
  setIsActionLoading: (value: boolean) => void;
}
export const MainActionContext = createContext<MainActionContextProp>({
  index: -1,
  setIndex: (value: number) => {},
  showModal: false,
  setShowModal: (value: boolean | string) => {},
  isTXLoading: false,
  setIsTXLoading: (value: boolean) => {},
  isActionLoading: false,
  setIsActionLoading: (value: boolean) => {},
});

const MainActionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [index, setIndex] = useState(-1);
  const [showModal, setShowModal] = useState<boolean | string>(false);
  const [isTXLoading, setIsTXLoading] = useState<boolean>(false);
  const [isActionLoading, setIsActionLoading] = useState<boolean>(true);

  return (
    <MainActionContext.Provider
      value={{ index, setIndex, showModal, setShowModal, isTXLoading, setIsTXLoading, isActionLoading, setIsActionLoading }}
    >
      {children}
    </MainActionContext.Provider>
  );
};
export default MainActionProvider;

export const useMainAction = () => {
  return useContext(MainActionContext);
};
