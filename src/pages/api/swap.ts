import { token } from "@project-serum/anchor/dist/cjs/utils";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { POOL_LIST_ACTIVE, TOKEN_LIST_ACTIVE } from "utils";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { fromMint, toMint } = req.query;
  let fromTokenData, toTokenData, poolPublicKey;
  if (fromMint) {
    for (let i = 0; i < TOKEN_LIST_ACTIVE.length; i++) {
      if (TOKEN_LIST_ACTIVE[i].mint === fromMint) {
        fromTokenData = TOKEN_LIST_ACTIVE[i];
        break;
      }
    }
  }

  if (toMint) {
    for (let i = 0; i < TOKEN_LIST_ACTIVE.length; i++) {
      if (TOKEN_LIST_ACTIVE[i].mint === toMint) {
        toTokenData = TOKEN_LIST_ACTIVE[i];
        break;
      }
    }
  }
  if (fromTokenData && toTokenData) {
    const tokenNamePair = fromTokenData?.name + toTokenData?.name;
    if (tokenNamePair === "SAXUSDC" || tokenNamePair === "USDCSAX") {
      poolPublicKey = POOL_LIST_ACTIVE[0].public_key;
    } else if (tokenNamePair === "SAXUSDT" || tokenNamePair === "USDTSAX") {
      poolPublicKey = POOL_LIST_ACTIVE[1].public_key;
    }
  }
  res.send({ fromTokenData: fromTokenData, toTokenData: toTokenData, poolPublicKey: poolPublicKey });
};
export default handler;
