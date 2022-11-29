import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { POOL_LIST_DUMMY } from "utils";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;
  const poolInfo = POOL_LIST_DUMMY.find((pool) => pool.address === address);
  res.send(poolInfo);
};

export default handler;
