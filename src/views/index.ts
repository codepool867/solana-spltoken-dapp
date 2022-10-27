import dynamic from "next/dynamic";

export const CopyRight = dynamic(import("./copyright"));
export const Exchange = dynamic(import("./exchange"));
export const PoolDeposit = dynamic(import("./pool/deposit"));
export const PoolDesktop = dynamic(import("./pool/desktop"));
export const PoolMobile = dynamic(import("./pool/mobile"));
export const PoolGridListButton = dynamic(import("./pool/gridListButton"));
export const PoolWithdraw = dynamic(import("./pool/withdraw"));
export const Social = dynamic(import("./social"));
export const Template = dynamic(import("./template"));
export const TokenModal = dynamic(import("./token-modal"));
