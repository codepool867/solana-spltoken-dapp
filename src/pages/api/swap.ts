import { token } from "@project-serum/anchor/dist/cjs/utils";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { pool_list, token_list } from "utils";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { fromMint, toMint } = req.query;
  let fromTokenData, toTokenData, poolPublicKey;
  if (fromMint) {
    for (let i = 0; i < token_list.length; i++) {
      if (token_list[i].mint === fromMint) {
        fromTokenData = token_list[i];
        break;
      }
    }
  }

  if (toMint) {
    for (let i = 0; i < token_list.length; i++) {
      if (token_list[i].mint === toMint) {
        toTokenData = token_list[i];
        break;
      }
    }
  }
  if (fromTokenData && toTokenData) {
    const tokenNamePair = fromTokenData?.name + toTokenData?.name;
    if (tokenNamePair === "SAXUSDC" || tokenNamePair === "USDCSAX") {
      poolPublicKey = pool_list[0].public_key;
    } else if (tokenNamePair === "SAXUSDT" || tokenNamePair === "USDTSAX") {
      poolPublicKey = pool_list[1].public_key;
    }
  }
  res.send({ fromTokenData: fromTokenData, toTokenData: toTokenData, poolPublicKey: poolPublicKey });
};
export default handler;
