import React, { type ChangeEvent, type FC, useState, useEffect } from "react";

import { Button, Col, Image, Notification, Row } from "components";
import { floatNumRegex, formatBalance, generateTransactionLink, handleErrors, network, type PoolDetailProps } from "utils";
import { SDK, Vault, WeightedPool } from "solax-sdk/src";
import { useSDKInit, useTokenInfo } from "contexts";
import { Keypair, PublicKey } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import mainActionStore from "store/mainActionStore";
const PoolWithdraw: FC<PoolDetailProps> = ({ poolDetail, pool_public_key }) => {
  const [percentageAmount, setPercentageAmount] = useState(100);
  // const [values, setValues] = useState({});
  const { sendTransaction, publicKey } = useWallet();
  const { faucet, vault } = useSDKInit();
  const { connection } = useConnection();
  const [values, setValues] = useState<number[]>([]);
  const [userPoolAmount, setUserPoolAmount] = useState<number>(0);
  // handle to save values of input
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues([...values, (Number(value) * percentageAmount) / 100]);
  };

  useEffect(() => {
    (async () => {
      if (faucet) {
        const provider = faucet.provider;
        const sdk = new SDK(provider);
        const pool = await WeightedPool.load(sdk, new PublicKey(pool_public_key));
        console.log(pool.data.poolMint, "=======");
        console.log(pool.data);
        const amount = await connection.getBalance(pool.data.poolMint);
        setUserPoolAmount(amount);
        //  const uiAmount = formatBalance(amount, token.mint, 9);
      }
    })();
  }, []);

  // handle deposit function
  const handleWithdraw = async () => {
    let signature = "";
    if (publicKey && faucet) {
      if (percentageAmount === 0 || userPoolAmount === 0) {
        Notification({ type: "warning", title: "warning", message: "Token input amount is invalid" });
        return;
      }
      // if() {
      // }
      mainActionStore.setIsActionLoading(true);
      try {
        const {
          context: { slot: minContextSlot },
          value: { blockhash, lastValidBlockHeight },
        } = await connection.getLatestBlockhashAndContext();
        const provider = faucet.provider;
        const sdk = new SDK(provider);
        const poolPublicKey = new PublicKey(pool_public_key);
        const pool = await WeightedPool.load(sdk, poolPublicKey);
        if (pool && vault) {
          Notification({ title: "Withdrawing...", message: "Preparing Transaction" });
          mainActionStore.setIsTXLoading(true);

          const { result: outAmount, tx } = await pool.removeLiquidityAndResult({
            vault,
            amount: (percentageAmount * userPoolAmount) / 100,
          });

          signature = await sendTransaction(tx, connection, { minContextSlot });
          mainActionStore.setIsTXLoading(false);
          await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
          const link = generateTransactionLink(signature, network);
          Notification({ type: "success", title: "Success", message: "Transaction is confirmed successfully", link });
          setValues([]);
        } else {
        }

        // confirm airdrop/claim transaction
      } catch (error) {
        handleErrors(error);
      } finally {
        mainActionStore.setIsTXLoading(false);
        mainActionStore.setIsActionLoading(false);
      }
    } else {
      Notification({ type: "warn", title: "Connection Required", message: "Please connect your wallet to SOLA-X" });
    }
  };

  return (
    <Col className="space-y-8 divide-gray-700 divide-y">
      <Col>
        <p className="text-[14px] text-gray-400 py-2">Select the percentage of your position to withdraw:</p>
        <Row className="space-x-2">
          <Row className="px-6 py-2 w-[120px] rounded-md bg-[#33313180]">
            <input
              type="number"
              min={0}
              max={100}
              pattern={`${floatNumRegex}`}
              placeholder="0"
              readOnly
              value={percentageAmount}
              className={`w-full bg-transparent outline-none text-center text-[18px] font-bold cursor-default`}
            />
            <p className="text-[18px] font-bold cursor-default">%</p>
          </Row>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={percentageAmount}
            onChange={(e: any) => {
              setPercentageAmount(e.target.value);
            }}
            className="range-slider w-full"
          />
        </Row>
      </Col>
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
              readOnly
              onChange={handleChange}
              className={`w-full bg-transparent outline-none text-right text-[24px] font-bold`}
            />
          </Row>
          <p className="text-[14px] text-gray-500 px-1">Max Withdrawal: 0</p>
        </Col>
      ))}
      <Button action={handleWithdraw} className="mt-4">
        Withdraw
      </Button>
    </Col>
  );
};

export default PoolWithdraw;
