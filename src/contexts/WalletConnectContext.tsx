import type { FC, PropsWithChildren } from "react";
import React, { createContext, useContext, useMemo } from "react";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";

export const WalletConnectContext = createContext({});

const WalletConnectProvider: FC<PropsWithChildren> = ({ children }) => {
  const network = process.env.NEXT_PUBLIC_NETWORK === "mainnet" ? WalletAdapterNetwork.Mainnet : WalletAdapterNetwork.Devnet;
  const customRpcUrl = process.env.NEXT_PUBLIC_CUSTOM_RPC_URL as string;
  const endpoint = useMemo(() => customRpcUrl || clusterApiUrl(network), [customRpcUrl, network]);

  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network })], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export const useWalletConnect = () => {
  return useContext(WalletConnectContext);
};
export default WalletConnectProvider;
