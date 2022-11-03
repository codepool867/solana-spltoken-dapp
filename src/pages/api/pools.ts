import { NextApiRequest, NextApiResponse } from "next";
import { pool_list } from "utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.send(pool_list);
};
