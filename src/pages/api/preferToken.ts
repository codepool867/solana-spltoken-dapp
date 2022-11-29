import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { TOKEN_LIST_ACTIVE } from "utils";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send(TOKEN_LIST_ACTIVE);
};
export default handler;
