import { PublicKey } from "@solana/web3.js";

import { Notification } from "components";
import type { ImageLoaderProps } from "./types";

import { TokenAmount } from "solax-spl-utils";
import { Token } from "solax-spl-utils/dist/src/token";
import BN from "bn.js";
// check whether it is empty or not
export const isEmpty = (value: unknown) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

// image load
export const loadImage = ({ src, width, height }: ImageLoaderProps) => {
  return `${src}?w=${width}?h=${height}`;
};

// wallet address format
export const formatWalletAddress = (address: PublicKey) => {
  return address.toBase58().slice(0, 4) + "....." + address.toBase58().slice(-4);
};

// balance format
export const formatBalance = (balance: number, mintAddress: string, decimal: number) => {
  const token = new Token({
    mint: new PublicKey(mintAddress),
    decimals: decimal, // make sure this is correct!
    cluster: "devnet", //process.env.NEXT_PUBLIC_NETWORK,
  });
  return TokenAmount.toUiAmountSync({ amount: new BN(balance), token: token });
};
export const formatBalanceToString = (balance: number | undefined) => {
  if (balance === undefined) return "0";
  return balance.toLocaleString("en-US", { maximumFractionDigits: 4 });
};
// handle overflow
export const handleAdjustOverflow = (isOpen: boolean) => {
  isOpen ? (document.body.style.overflowY = "hidden") : (document.body.style.overflowY = "scroll");
};

// generateTransactionLink
export const generateTransactionLink = (signature: string, network: string) => {
  return `https://explorer.solana.com/tx/${signature}?cluster=${network}`;
};

// parse functions
export const parseBoolean = (value: string): boolean => {
  return value === "true";
};

export const parseDate = (value: string): Date => {
  return new Date(value);
};

export const parseKey = (key: string): PublicKey | undefined => {
  if (key === "") {
    return undefined;
  }
  return new PublicKey(key);
};

// handle errors
export const handleErrors = (err: any) => {
  console.log(err, "err");
  let msg = err.message;
  try {
    if (err.logs) {
      const log = err.logs.find((log: string) => log.includes("Error Number:"));
      msg = log.substring(log.indexOf("Error Message:") + 14, log.length);
    }
  } catch (error) {
    console.log(error, "error");
  }

  Notification({ type: "error", title: "Transaction failure", message: msg });
};
