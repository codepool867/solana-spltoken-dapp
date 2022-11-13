import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { pool_list } from "utils";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send(pool_list);
};

export default handler;
