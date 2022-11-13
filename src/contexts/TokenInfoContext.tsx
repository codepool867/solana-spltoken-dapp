import { FC, PropsWithChildren, useEffect } from "react";
import React, { createContext, useContext, useState } from "react";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

import { formatBalance, handleErrors, token_list, parseKey, SelectedTokenType, type BalanceProps, type PairProps } from "utils";

export interface TokenInfoProps {
  selectedTokenType?: SelectedTokenType;
  setSelectedTokenType: (value?: SelectedTokenType) => void;
  inputTokenData?: PairProps;
  setInputTokenData: (value?: PairProps) => void;
  outputTokenData?: PairProps;
  setOutputTokenData: (value?: PairProps) => void;
  inputAmount?: number;
  setInputAmount: (value: number) => void;
  outputAmount?: number;
  setOutputAmount: (value: number) => void;
  balance: BalanceProps;
  setBalance: (value: {}) => void;
  getBalance: () => void;
  slippageValue: number;
  setSlippageValue: (value: number) => void;
}

export const TokenInfoContext = createContext<TokenInfoProps>({
  setSelectedTokenType: (value?: SelectedTokenType) => {},
  setInputTokenData: (value?: PairProps) => {},
  setOutputTokenData: (value?: PairProps) => {},
  setInputAmount: (value: number) => {},
  setOutputAmount: (value: number) => {},
  balance: {},
  setBalance: (value: {}) => {},
  getBalance: () => {},
  slippageValue: 0,
  setSlippageValue: (value: number) => {},
});

export const TokenInfoProvider: FC<PropsWithChildren> = ({ children }) => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [selectedTokenType, setSelectedTokenType] = useState<SelectedTokenType>();
  const [inputTokenData, setInputTokenData] = useState<PairProps | undefined>();
  const [outputTokenData, setOutputTokenData] = useState<PairProps | undefined>();
  const [inputAmount, setInputAmount] = useState<number>();
  const [outputAmount, setOutputAmount] = useState<number>();
  const [balance, setBalance] = useState<BalanceProps>({});
  const [slippageValue, setSlippageValue] = useState<number>(0.1);

  useEffect(() => {
    // when connect wallet, call getBalance()
    if (publicKey) {
      getBalance();
    }
  }, [publicKey]);

  // handle to get SOL/SPL token balance of connected wallet
  const getBalance = async () => {
    try {
      token_list.map(async (token) => {
        const address = parseKey(token.mint);
        if (token.name === "SOL") {
          const amount = await connection.getBalance(publicKey as PublicKey);
          const uiAmount = formatBalance(amount, token.mint, 9);
          setBalance((balance: {}) => {
            return { ...balance, SOL: Number(uiAmount) };
          });
          return uiAmount;
        } else {
          const result = await connection.getParsedTokenAccountsByOwner(publicKey as PublicKey, { mint: address as PublicKey });
          if (result.value.length > 0) {
            const parsedInfo = result.value[0].account.data.parsed;
            const uiAmount = parsedInfo.info.tokenAmount.uiAmount;
            setBalance((balance: {}) => {
              return { ...balance, [token.name]: Number(uiAmount) };
            });
            return uiAmount;
          }
        }
      });
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <TokenInfoContext.Provider
      value={{
        selectedTokenType,
        setSelectedTokenType,
        inputTokenData,
        setInputTokenData,
        outputTokenData,
        setOutputTokenData,
        inputAmount,
        setInputAmount,
        outputAmount,
        setOutputAmount,
        balance,
        setBalance,
        getBalance,
        slippageValue,
        setSlippageValue,
      }}
    >
      {children}
    </TokenInfoContext.Provider>
  );
};

export const useTokenInfo = () => {
  return useContext(TokenInfoContext);
};
