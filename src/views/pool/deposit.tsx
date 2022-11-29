import React, { type ChangeEvent, type FC, useState } from "react";

import { Button, Col, Image, Notification, Row } from "components";
import {
  floatNumRegex,
  formatBalanceToString,
  generateTransactionLink,
  handleErrors,
  network,
  PoolProps,
  type PoolDetailProps,
} from "utils";

import { SDK, Vault, WeightedPool } from "solax-sdk/src";
import { useSDKInit, useTokenInfo } from "contexts";
import { Keypair, PublicKey } from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import useAutoFocus from "hooks/useAutoFocus";
import mainActionStore from "store/mainActionStore";
const PoolDeposit: FC<PoolDetailProps> = ({ poolDetail }) => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { faucet, vault } = useSDKInit();
  const amoutInput = useAutoFocus();
  const [values, setValues] = useState<number[]>([]);
  const { balance, getBalance } = useTokenInfo();

  const handleChange = (index: number, amount: number) => {
    setValues((prevState) => {
      let newValues = [...prevState];
      newValues[index] = amount;
      return newValues;
    });
  };

  const handleDeposit = async () => {
    let signature = "";
    if (publicKey && faucet) {
      let hasAmount = false;
      values.map((value) => {
        if (value > 0) hasAmount = true;
      });
      if (!hasAmount) {
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
        const poolPublicKey = new PublicKey(poolDetail.public_key);
        const pool = await WeightedPool.load(sdk, poolPublicKey);
        if (pool && vault) {
          Notification({ title: "Depositing...", message: "Preparing Transaction" });
          mainActionStore.setIsTXLoading(true);

          const { result: outAmount, tx } = await pool.addLiquidityAndResult({
            vault,
            amounts: values,
          });

          signature = await sendTransaction(tx, connection, { minContextSlot });
          Notification({ type: "success", title: "Submited", message: "Transaction is submited " });
          mainActionStore.setIsTXLoading(false);
          await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
          const link = generateTransactionLink(signature, network);
          Notification({ type: "success", title: "Success", message: "Transaction is confirmed successfully", link });
          getBalance();
          // setValues([]);
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
      {poolDetail.pairs.map((pool, index) => (
        <Col key={`pool_detail_${index}`} className="space-y-4 pt-8">
          <Row className="justify-between space-x-2">
            <div className="select-none">
              <Row className="items-center space-x-2 w-[120px] px-3 py-2 rounded-[20px] bg-[#33313180]">
                <Image src={pool.icon} alt={pool.alt} width={25} height={25} />
                <p>{pool.name}</p>
              </Row>
            </div>
            {index === 0 ? (
              <input
                type="number"
                name={pool.name}
                min={0}
                pattern={`${floatNumRegex}`}
                placeholder="0.00"
                step="any"
                ref={amoutInput}
                onChange={(e) => handleChange(index, Number(e.target.value))}
                className={`w-full bg-transparent outline-none text-right text-[24px] font-bold`}
              />
            ) : (
              <input
                type="number"
                name={pool.name}
                min={0}
                pattern={`${floatNumRegex}`}
                placeholder="0.00"
                step="any"
                onChange={(e) => handleChange(index, Number(e.target.value))}
                className={`w-full bg-transparent outline-none text-right text-[24px] font-bold`}
              />
            )}
          </Row>
          <p className="text-[14px] text-gray-500 px-1">Balance: {formatBalanceToString(balance[pool.name])}</p>
        </Col>
      ))}
      <Button action={handleDeposit} className="mt-4">
        Deposit
      </Button>
    </Col>
  );
};

export default PoolDeposit;
