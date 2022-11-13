import type { FC, PropsWithChildren } from "react";
import { createContext, useContext, useState, useEffect } from "react";

import { Faucet } from "solax-spl-faucet";
import { AnchorProvider } from "@project-serum/anchor";
import { type AnchorWallet, useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

export interface SDKInitContextProps {
  faucet?: Faucet;
}

export const SDKInitContext = createContext<SDKInitContextProps>({});

export const SDKInitProvider: FC<PropsWithChildren> = ({ children }) => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [faucet, setFaucet] = useState<Faucet>();

  useEffect(() => {
    if (wallet) {
      const provider = new AnchorProvider(connection, wallet as AnchorWallet, {
        skipPreflight: false,
        preflightCommitment: "confirmed",
      });
      const faucet = new Faucet(provider);
      setFaucet(faucet);
    }
  }, [wallet, connection]);

  return <SDKInitContext.Provider value={{ faucet }}>{children}</SDKInitContext.Provider>;
};

export const useSDKInit = () => {
  return useContext(SDKInitContext);
};
