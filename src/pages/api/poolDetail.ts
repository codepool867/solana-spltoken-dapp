import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { pool_list_test } from "utils";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;
  if (address) {
    console.log(address);
    let i: number;
    console.log(pool_list_test.length);
    for (i = 0; i < pool_list_test.length; i++) {
      if (pool_list_test[i].address === address) {
        break;
      }
    }
    if (i < pool_list_test.length) {
      res.send(pool_list_test[i]);
    }
  } else {
    res.send([]);
  }
};

export default handler;
