import { NextApiRequest, NextApiResponse } from "next";
import { token_list } from "utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.send(token_list);
};
