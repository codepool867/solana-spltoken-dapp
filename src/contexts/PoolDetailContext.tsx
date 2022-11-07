import type { FC, PropsWithChildren } from "react";
import React, { createContext, useContext, useState } from "react";

import type { PairProps } from "utils";

export interface PoolDetailContextProps {
  poolDetail?: PairProps[];
  setPoolDetail: (poolDetail: PairProps[]) => void;
}

export const PoolDetailContext = createContext<PoolDetailContextProps>({
  setPoolDetail: () => {},
});

const PoolDetailProvider: FC<PropsWithChildren> = ({ children }) => {
  const [poolDetail, setPoolDetail] = useState<PairProps[] | undefined>();

  return <PoolDetailContext.Provider value={{ poolDetail, setPoolDetail }}>{children}</PoolDetailContext.Provider>;
};
export default PoolDetailProvider;

export const usePoolDetail = () => {
  return useContext(PoolDetailContext);
};
