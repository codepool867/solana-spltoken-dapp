import React, { type ChangeEvent, type FC, useState } from "react";

import { Button, Col, Image, Row } from "components";
import { floatNumRegex, type PoolDetailProps } from "utils";

import { SDK, Vault, WeightedPool } from "solax-sdk/src";
import { AnchorProvider } from "@project-serum/anchor";
import { Keypair } from "@solana/web3.js";

const PoolDeposit: FC<PoolDetailProps> = ({ poolDetail }) => {
  const [values, setValues] = useState({});

  // handle to save values of input
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // handle deposit function
  const handleDeposit = async () => {
    const provider = AnchorProvider.env();
    const sdk = new SDK(provider);
    const vaultKP = Keypair.generate(); //todo:
    const poolKP = Keypair.generate(); //todo:
    const vault = new Vault(sdk, vaultKP.publicKey);
    const pool = await WeightedPool.load(sdk, poolKP.publicKey);
    const { result: outAmount, tx } = await pool.addLiquidityAndResult({
      vault,
      amounts: [3000, 6000, 1000],
      userKP: vaultKP,
    });
    console.log("Out Amount:", outAmount);
    tx.sign([walletKP]);
    const signature = await sdk.provider.connection.sendTransaction(tx);
    await pool.confirmTX(signature);

    console.log(values, "values");
  };

  return (
    <Col className="space-y-8 divide-gray-700 divide-y">
      {poolDetail.map((pool, index) => (
        <Col key={`pool_detail_${index}`} className="space-y-4 pt-8">
          <Row className="justify-between space-x-2">
            <div className="select-none">
              <Row className="items-center space-x-2 w-[120px] px-3 py-2 rounded-[20px] bg-[#33313180]">
                <Image src={pool.icon} alt={pool.alt} width={25} height={25} />
                <p>{pool.name}</p>
              </Row>
            </div>
            <input
              type="number"
              name={pool.name}
              min={0}
              pattern={`${floatNumRegex}`}
              placeholder="0.00"
              step="any"
              onChange={handleChange}
              className={`w-full bg-transparent outline-none text-right text-[24px] font-bold`}
            />
          </Row>
          <p className="text-[14px] text-gray-500 px-1">Balance: 0</p>
        </Col>
      ))}
      <Button action={handleDeposit} className="mt-4">
        Deposit
      </Button>
    </Col>
  );
};

export default PoolDeposit;
