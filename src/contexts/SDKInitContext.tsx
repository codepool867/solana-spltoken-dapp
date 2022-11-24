import type { FC, PropsWithChildren } from "react";
import { createContext, useContext, useState, useEffect } from "react";

import { Faucet } from "solax-spl-faucet";
import { AnchorProvider } from "@project-serum/anchor";
import { type AnchorWallet, useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { SDK, Vault, WeightedPool } from "solax-sdk/src";
import { PublicKey } from "@solana/web3.js";
export interface SDKInitContextProps {
  faucet?: Faucet;
  vault?: Vault;
}

export const SDKInitContext = createContext<SDKInitContextProps>({});

export const SDKInitProvider: FC<PropsWithChildren> = ({ children }) => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [faucet, setFaucet] = useState<Faucet>();
  const [vault, setValut] = useState<Vault>();

  useEffect(() => {
    if (wallet) {
      const provider = new AnchorProvider(connection, wallet as AnchorWallet, {
        skipPreflight: false,
        preflightCommitment: "confirmed",
      });
      const faucet = new Faucet(provider);
      const sdk = new SDK(provider);
      const vaultPublicKey = new PublicKey("F15R9LdtzZxTxJTtGxMRKrfggDXGY22r3r58b6vmmTxy");
      (async () => {
        const vault = await Vault.load(sdk, vaultPublicKey);
        setValut(vault);
      })();
      setFaucet(faucet);
    }
  }, [wallet, connection]);

  return <SDKInitContext.Provider value={{ faucet, vault }}>{children}</SDKInitContext.Provider>;
};

export const useSDKInit = () => {
  return useContext(SDKInitContext);
};
