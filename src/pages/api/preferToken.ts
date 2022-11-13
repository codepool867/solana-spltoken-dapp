import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { token_list } from "utils";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send(token_list);
};
export default handler;
