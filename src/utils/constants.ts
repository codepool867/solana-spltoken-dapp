import { RiTwitterFill as Twitter, RiMediumFill as Medium, RiDiscordFill as Discord } from "react-icons/ri";

import type { SeoProps } from "./types";

import SOL from "assets/images/sol.png";
import SAX from "assets/images/sola-x.png";
import USDC from "assets/images/usdc.png";
import USDT from "assets/images/usdt.png";

// const SOL
// const USDT_ICON = "https://cdn.jsdelivr.net/gh/saber-hq/spl-token-icons@master/icons/101/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB.svg"
// const USDC_ICON
const aUSDC = "https://assets.coingecko.com/coins/images/14318/small/aUSDC.e260d492.png?1615527797";
const mSOL = "https://assets.coingecko.com/coins/images/17752/thumb/mSOL.png?1644541955";
const gSOL =
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CiBddaPynSdAG2SkbrusBfyrUKdCSXVPHs6rTgSEkfsV/icon.svg";
const GM =
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Cr45u6cdxB8oz7m3f8b89eacpwZh9DsRdQsNSzwmxh9R/logo.png";
const WSOL =
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png";
const daoSOL =
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GEJpt3Wjmr628FqXxTgxMce1pLntcPV4uFi8ksxMyPQh/logo.png";

export const network = process.env.NEXT_PUBLIC_NETWORK ? (process.env.NEXT_PUBLIC_NETWORK as string) : "devnet";

// pattern list
export const floatNumRegex = /^[+-]?\d+(\.\d+)?$/;

// selected token type
export enum SelectedTokenType {
  Input,
  Output,
}

// seo list
export const seo_list: { [any: string]: SeoProps } = {
  swap: {
    title: "SOLA-X | SWAP",
    description:
      "$SAX token holders can stake their tokens a earn trading rewards or trade with discounts. $SAX staking will also be part of smart liquidity routing.",
    image: "/preview/default.png",
    canonical: "swap",
  },
  pools: {
    title: "SOLA-X | POOLS",
    description:
      "$SAX token holders can stake their tokens a earn trading rewards or trade with discounts. $SAX staking will also be part of smart liquidity routing.",
    image: "/preview/default.png",
    canonical: "pools",
  },
  airdrop: {
    title: "SOLA-X | Airdrop",
    description: "Airdrop devnet tokens to test SOLA-X",
    image: "/preview/default.png",
    canonical: "airdrop",
  },
  404: {
    title: "404 | Page Not Found",
    description: "Smart liquidity cross-chain protocol powered by Solana.",
    image: "/preview/default.png",
    canonical: "404",
  },
  500: {
    title: "500 | Server Error",
    description: "Smart liquidity cross-chain protocol powered by Solana.",
    image: "/preview/default.png",
    canonical: "500",
  },
};

// airdrop_list
export const airdrop_list = [
  // { name: "SOL", symbol: "SOL", icon: SOL, alt: "SOL", mint: "So11111111111111111111111111111111111111112" },
  { name: "SAX", symbol: "SAX", icon: SAX, alt: "SAX", mint: "SAX2cChnuhnKfUDERWVHyd8CoeDNR4NjoxwjuW8uiqa" },
  { name: "USDC", symbol: "USDC", icon: USDC, alt: "USDC", mint: "AfWWqUHFzJFSxQHYn6PvyaoyswyodHgCTeDiRgovEmHX" },
  { name: "USDT", symbol: "USDT", icon: USDT, alt: "USDT", mint: "FeCtM4bXUGo8vGrvHUCZjybmesovZLkQqCGqMuhHUHfZ" },
];

// menu list
export const menu_list = [
  { name: "Swap", path: "/swap", condition: "mainnet | devnet" },
  { name: "Pools", path: "/pools", condition: "mainnet | devnet" },
  { name: "Airdrop", path: "/airdrop", condition: "devnet" },
  // { name: "$Sax Token", path: "https://solax.so/details" },
  { name: "Docs", path: "https://docs.solax.so/", condition: "mainnet | devnet" },
];

// resource list
export const resource_list = [
  { name: "github", path: "https://github.com/solaxlabs" },
  { name: "white paper", path: "https://drive.google.com/file/d/1eA3K8mfEG_SUN2VF_9r8Of2k23p8i3j7/view?usp=sharing" },
  { name: "pitch deck", path: "https://drive.google.com/file/d/1FA8TMHwu3aRvvCG6FfYvyWXuSIY0qPY-/view?usp=sharing" },
  // { name: "coingecko", path: "" },
  // { name: "coinmarketcap", path: "" },
];

// contact list
export const contact_list = [{ name: "hello@solax.app" }];

// slippage list
export const slippage_list = [{ value: 0.1 }, { value: 0.5 }, { value: 1.0 }];

// social list
export const social_list = [
  { label: "Twitter", icon: Twitter, path: "https://twitter.com/solaxapp" },
  { label: "Medium", icon: Medium, path: "https://medium.com/@solaxapp" },
  { label: "Discord", icon: Discord, path: "https://discord.gg/SfkybtttdC" },
];

// token_list for swap
export const token_list = [
  // { name: "SOL", icon: SOL, alt: "", balance: 50, symbol: "SOL", mint: "So11111111111111111111111111111111111111112" },
  { name: "SAX", icon: SAX, alt: "", balance: 500000, symbol: "SAX", mint: "SAX2cChnuhnKfUDERWVHyd8CoeDNR4NjoxwjuW8uiqa" },
  { name: "USDC", icon: USDC, alt: "", balance: 4000, symbol: "USDC", mint: "AfWWqUHFzJFSxQHYn6PvyaoyswyodHgCTeDiRgovEmHX" },
  { name: "USDT", icon: USDT, alt: "", balance: 900, symbol: "USDT", mint: "FeCtM4bXUGo8vGrvHUCZjybmesovZLkQqCGqMuhHUHfZ" },
  // { name: "SOL", icon: SOL, alt: "", balance: 50, symbol: "SOL", mint: "So11111111111111111111111111111111111111112" },
  // { name: "SAX", icon: SAX, alt: "", balance: 500000, symbol: "SAX", mint: "SAX2cChnuhnKfUDERWVHyd8CoeDNR4NjoxwjuW8uiqa" },
  // { name: "USDC", icon: USDC, alt: "", balance: 4000, symbol: "USDC", mint: "AfWWqUHFzJFSxQHYn6PvyaoyswyodHgCTeDiRgovEmHX" },
  // { name: "USDT", icon: USDT, alt: "", balance: 900, symbol: "USDT", mint: "FeCtM4bXUGo8vGrvHUCZjybmesovZLkQqCGqMuhHUHfZ" },
  // { name: "SOL", icon: SOL, alt: "", balance: 50, symbol: "SOL", mint: "So11111111111111111111111111111111111111112" },
  // { name: "SAX", icon: SAX, alt: "", balance: 500000, symbol: "SAX", mint: "SAX2cChnuhnKfUDERWVHyd8CoeDNR4NjoxwjuW8uiqa" },
  // { name: "USDC", icon: USDC, alt: "", balance: 4000, symbol: "USDC", mint: "AfWWqUHFzJFSxQHYn6PvyaoyswyodHgCTeDiRgovEmHX" },
  // { name: "USDT", icon: USDT, alt: "", balance: 900, symbol: "USDT", mint: "FeCtM4bXUGo8vGrvHUCZjybmesovZLkQqCGqMuhHUHfZ" },
];

export const prefer_token_list = [
  { name: "SOL", icon: SOL, alt: "", balance: 50, symbol: "SOL", mint: "So11111111111111111111111111111111111111112" },
  { name: "SAX", icon: SAX, alt: "", balance: 500000, symbol: "SAX", mint: "SAX2cChnuhnKfUDERWVHyd8CoeDNR4NjoxwjuW8uiqa" },
  { name: "USDC", icon: USDC, alt: "", balance: 4000, symbol: "USDC", mint: "AfWWqUHFzJFSxQHYn6PvyaoyswyodHgCTeDiRgovEmHX" },
  { name: "USDT", icon: USDT, alt: "", balance: 900, symbol: "USDT", mint: "FeCtM4bXUGo8vGrvHUCZjybmesovZLkQqCGqMuhHUHfZ" },
];

// pool list

export const pool_list = [
  {
    pairs: [
      { name: "SAX", icon: SAX, symbol: "SAX", alt: "SAX", mint: "SAX2cChnuhnKfUDERWVHyd8CoeDNR4NjoxwjuW8uiqa" },
      { name: "USDC", icon: USDC, symbol: "USDC", alt: "USDC", mint: "AfWWqUHFzJFSxQHYn6PvyaoyswyodHgCTeDiRgovEmHX" },
    ],
    liquidity: 200000,
    volume_30d: 300000,
    fees_30d: 30,
    apr_30d: 80,
    public_key: "G6SLFJopxHCmkEq2E6GGm6EQ6jsM6u1nmtMGdf9M6Ke",
    address: "AfWWqUHFzJFSxQHYn6PvyaoyswyodHgCTeDiRgovEmHX",
    name: "SAX80-USDC20",
  },
  {
    pairs: [
      { name: "SAX", icon: SAX, symbol: "SAX", alt: "SAX", mint: "SAX2cChnuhnKfUDERWVHyd8CoeDNR4NjoxwjuW8uiqa" },
      { name: "USDT", icon: USDT, alt: "USDT", symbol: "USDT", mint: "FeCtM4bXUGo8vGrvHUCZjybmesovZLkQqCGqMuhHUHfZ" },
    ],
    liquidity: 200000,
    volume_30d: 300000,
    fees_30d: 30,
    apr_30d: 80,
    public_key: "78zodeD2ZkiuKy5YWjY3m3B9w2zcLJHicbkwN7iEJYqH",
    address: "78zodeD2ZkiuKy5YWjY3m3B9w2zcLJHicbkwN7iEJYqH",
    name: "SAX80-USDT20",
  },
];
export const pool_list_test = [
  {
    pairs: [
      { name: "SAX", icon: SAX, symbol: "SAX", alt: "SAX", mint: "SAX2cChnuhnKfUDERWVHyd8CoeDNR4NjoxwjuW8uiqa" },
      { name: "USDC", icon: USDC, symbol: "USDC", alt: "USDC", mint: "AfWWqUHFzJFSxQHYn6PvyaoyswyodHgCTeDiRgovEmHX" },
    ],
    liquidity: 200000,
    volume_30d: 300000,
    fees_30d: 30,
    apr_30d: 80,
    public_key: "G6SLFJopxHCmkEq2E6GGm6EQ6jsM6u1nmtMGdf9M6Ke",
    address: "G6SLFJopxHCmkEq2E6GGm6EQ6jsM6u1nmtMGdf9M6Ke",
    name: "SAX80-USDC20",
  },
  {
    pairs: [
      { name: "SAX", icon: SAX, symbol: "SAX", alt: "SAX", mint: "SAX2cChnuhnKfUDERWVHyd8CoeDNR4NjoxwjuW8uiqa" },
      { name: "USDT", icon: USDT, alt: "USDT", symbol: "USDT", mint: "FeCtM4bXUGo8vGrvHUCZjybmesovZLkQqCGqMuhHUHfZ" },
    ],
    liquidity: 200000,
    volume_30d: 300000,
    fees_30d: 30,
    apr_30d: 80,
    public_key: "78zodeD2ZkiuKy5YWjY3m3B9w2zcLJHicbkwN7iEJYqH",
    address: "78zodeD2ZkiuKy5YWjY3m3B9w2zcLJHicbkwN7iEJYqH",
    name: "SAX80-USDT20",
  },
  {
    pairs: [
      { name: "SAX", icon: SAX, symbol: "SAX", alt: "SAX", mint: "SAX2cChnuhnKfUDERWVHyd8CoeDNR4NjoxwjuW8uiqa" },
      { name: "USDC", icon: USDC, symbol: "USDC", alt: "USDC", mint: "AfWWqUHFzJFSxQHYn6PvyaoyswyodHgCTeDiRgovEmHX" },
    ],
    liquidity: 200000,
    volume_30d: 300000,
    fees_30d: 30,
    apr_30d: 80,
    public_key: "7nknfk12wDGydRqarcoY86nrWRcM2RAggwys1rpprDdB",
    address: "7nknfk12wDGydRqarcoY86nrWRcM2RAggwys1rpprDdB",
    name: "SAX-USDC",
  },
  {
    pairs: [
      { name: "SAX", icon: SAX, symbol: "SAX", alt: "SAX", mint: "SAX2cChnuhnKfUDERWVHyd8CoeDNR4NjoxwjuW8uiqa" },
      { name: "USDT", icon: USDT, alt: "USDT", symbol: "USDT", mint: "FeCtM4bXUGo8vGrvHUCZjybmesovZLkQqCGqMuhHUHfZ" },
    ],
    liquidity: 200000,
    volume_30d: 300000,
    fees_30d: 30,
    apr_30d: 80,
    public_key: "49mxKUMU1SScrXF9ySUGKqmUAUPEUDbdALjuf7YM1anY",
    address: "49mxKUMU1SScrXF9ySUGKqmUAUPEUDbdALjuf7YM1anY",
    name: "SAX-USDT",
  },
];

export const table_head_list = [
  { title: "pools", width: "w-[50%]" },
  { title: "liquidity", width: "w-[10%]" },
  { title: "volume 30d", width: "w-[15%]" },
  { title: "fees 30d", width: "w-[10%]" },
  { title: "apr 30d", width: "w-[15%]" },
];
