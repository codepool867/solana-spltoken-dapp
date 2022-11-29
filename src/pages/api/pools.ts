import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { POOL_LIST_ACTIVE } from "utils";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page } = req.query;
  if (page && Number(page) > 1) {
    res.send([]);
  } else {
    res.send(POOL_LIST_ACTIVE);
  }
};

export default handler;
