import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { pool_list } from "utils";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page } = req.query;
  if (page && Number(page) > 1) {
    res.send([]);
  } else {
    res.send(pool_list);
  }
};

export default handler;
