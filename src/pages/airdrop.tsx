import React, { useEffect } from "react";

import { ClipLoader } from "react-spinners";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

import { Button, Col, Container, Image, Notification, Page, Row } from "components";
import { useSDKInit, useTokenInfo } from "contexts";
import { airdrop_list, formatBalanceToString, generateTransactionLink, handleErrors, network } from "utils";
import mainActionStore from "store/mainActionStore";
import { observer } from "mobx-react-lite";
// airdrop page for only devnet
const Airdrop = () => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { faucet } = useSDKInit();
  const { balance, getBalance } = useTokenInfo();

  useEffect(() => {
    mainActionStore.setIsActionLoading(false);
  }, []);
  // handle claim/airdrop SOL, SAX, USDC/USDT function
  const handleClaim = async (name: string, mint: string, id: number) => {
    let signature = "";
    const amount = 100;
    const address = new PublicKey(mint);

    if (publicKey && faucet) {
      mainActionStore.setIndex(id);
      mainActionStore.setIsActionLoading(true);
      try {
        const {
          context: { slot: minContextSlot },
          value: { blockhash, lastValidBlockHeight },
        } = await connection.getLatestBlockhashAndContext();
        Notification({ title: "Airdropping...", message: "Preparing Transaction" });
        mainActionStore.setIsTXLoading(true);
        if (name === "SOL") {
          // airdrop SOL
          signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
        } else if (name === "SAX") {
          // airdrop SAX
          const transaction = await faucet.claim({ mint: address, amount });
          signature = await sendTransaction(transaction, connection, { minContextSlot });
        } else {
          // airdrop USDC/USDT
          const transaction = await faucet.airdrop({ mint: address, amount });
          signature = await sendTransaction(transaction, connection, { minContextSlot });
        }
        mainActionStore.setIsTXLoading(false);
        // confirm airdrop/claim transaction
        await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
        const link = generateTransactionLink(signature, network);
        Notification({ type: "success", title: "Success", message: "Transaction is confirmed successfully", link });
      } catch (error) {
        handleErrors(error);
      } finally {
        getBalance();
        mainActionStore.setIsTXLoading(false);
        mainActionStore.setIsActionLoading(false);
      }
    } else {
      Notification({ type: "warn", title: "Connection Required", message: "Please connect your wallet to SOLA-X" });
    }
  };

  return (
    <Page name="airdrop">
      <Container className="py-10">
        <Col className="max-w-[560px] w-full mx-auto space-y-8">
          <Col className="space-y-2">
            <p className="text-[36px] tablet:text-[24px] font-bold">Airdrop</p>
            <p className="font-medium text-[16px] text-gray-500">
              {network === "devnet" ? "Claim devnet tokens to test SOLA-X" : "There is no airdrop available on mainnet."}
            </p>
          </Col>
        </Col>
        {network === "devnet" && (
          <div className="max-w-[560px] w-full mx-auto mt-10 px-[28px] normal:px-[16px] py-[20px] normal:py-[12px] bg-card_normal rounded-[20px] divide-y">
            <Col className="space-y-8 divide-gray-700 divide-y">
              {airdrop_list.map((airdrop, id) => (
                <Col key={`devnet_airdrop_${id}`} className="space-y-4 pt-8">
                  <Row className="items-center justify-between space-x-2">
                    <div className="select-none">
                      <Row className="h-[54px] items-center space-x-2 w-[120px] px-3 py-2 rounded-2xl bg-[#33313180]">
                        <Image src={airdrop.icon} alt={airdrop.alt} width={30} height={30} className="rounded-full" />
                        <p className="text-[16px]">{airdrop.name}</p>
                      </Row>
                    </div>

                    <Button isLoading={mainActionStore.isActionLoading} action={() => handleClaim(airdrop.name, airdrop.mint, id)}>
                      {mainActionStore.isActionLoading && mainActionStore.index === id ? <ClipLoader size={25} color="white" /> : "Claim"}
                    </Button>
                  </Row>
                  <p className="text-[14px] text-gray-500 px-1">Balance: {formatBalanceToString(balance[airdrop.name])}</p>
                </Col>
              ))}
            </Col>
          </div>
        )}
      </Container>
    </Page>
  );
};

export default observer(Airdrop);
