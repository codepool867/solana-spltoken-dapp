import React, { useEffect, useState } from "react";

import { useDetectClickOutside } from "react-detect-click-outside";
import { GoSettings, GoCheck } from "react-icons/go";
import { TbArrowsUpDown } from "react-icons/tb";
import { observer } from "mobx-react-lite";
import swapTokenStore from "store/swapTokenStore";
import { Button, Col, Container, LaunchApp, Notification, Page, Row } from "components";
import { useTokenInfo } from "contexts";
import mainActionStore from "store/mainActionStore";
import { Exchange, TokenModal } from "views";
import { default_link, generateTransactionLink, handleErrors, network, pool_list, slippage_list } from "utils";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useSDKInit } from "contexts";
import { PublicKey } from "@solana/web3.js";
import { SDK, WeightedPool } from "solax-sdk";
import { useRouter } from "next/router";
import axios from "axios";
// swap page
const Swap = () => {
  useEffect(() => {
    if (swapTokenStore.pageNumber === 1) {
      swapTokenStore.getTokensFromApi(1);
    }
  }, []);
  const { publicKey, sendTransaction } = useWallet();
  const { faucet, vault } = useSDKInit();
  const { connection } = useConnection();
  const {
    inputAmount,
    inputTokenData,
    outputTokenData,
    setInputTokenData,
    setOutputTokenData,
    slippageValue,
    setSlippageValue,
    balance,
    getBalance,
    setOutputAmount,
  } = useTokenInfo();
  const [hasOrder, setHasOrder] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [poolPublicKey, setPoolPublckey] = useState("");
  const router = useRouter();
  // const { from, to } = router.query;
  useEffect(() => {
    const { from, to } = router.query;
    if (from && to) {
      (async () => {
        try {
          const res = await axios({
            method: "GET",
            url: "api/swap",
            params: { fromMint: from, toMint: to },
          });
          const { fromTokenData, toTokenData, poolPublicKey } = res.data;
          setInputTokenData(fromTokenData);
          setOutputTokenData(toTokenData);
          setPoolPublckey(poolPublicKey);
          if (faucet && inputTokenData && outputTokenData && inputAmount) {
            const provider = faucet.provider;
            const sdk = new SDK(provider);

            const pool = await WeightedPool.load(sdk, new PublicKey(poolPublicKey));
            if (pool && vault) {
              // Notification({ title: "Swapping...", message: "Preparing Transaction" });
              mainActionStore.setIsTXLoading(true);

              const { result: outAmount, tx } = await pool.swapAndResult({
                vault,
                fromMintK: new PublicKey(inputTokenData.mint),
                toMintK: new PublicKey(outputTokenData.mint),
                amount: inputAmount,
              });
              setOutputAmount(outAmount);
            }
          }
        } catch (error) {
          handleErrors(error);
        } finally {
          mainActionStore.setIsActionLoading(false);
        }
      })();
    }
  }, [router.query, setInputTokenData, setOutputTokenData, setPoolPublckey]);
  useEffect(() => {
    const { from, to } = router.query;
    if (from === undefined && inputTokenData && outputTokenData) {
      router.push(`/swap?from=${inputTokenData.mint}&to=${outputTokenData.mint}`);
    } else if (from === undefined && inputTokenData === undefined) {
      router.push(default_link);
    }
  }, [inputTokenData, outputTokenData, router]);
  useEffect(() => {
    if (faucet && inputTokenData && outputTokenData && inputAmount && poolPublicKey) {
      const provider = faucet.provider;
      const sdk = new SDK(provider);
      (async () => {
        console.log(poolPublicKey, "===========");
        const pool = await WeightedPool.load(sdk, new PublicKey(poolPublicKey));
        if (pool && vault) {
          // Notification({ title: "Swapping...", message: "Preparing Transaction" });
          mainActionStore.setIsTXLoading(true);

          const { result: outAmount, tx } = await pool.swapAndResult({
            vault,
            fromMintK: new PublicKey(inputTokenData.mint),
            toMintK: new PublicKey(outputTokenData.mint),
            amount: inputAmount,
          });
          setOutputAmount(outAmount);
        }
      })();
    } else if (!poolPublicKey) {
      setOutputAmount(0);
    }
  }, [inputTokenData, outputTokenData, faucet, vault, inputAmount, setOutputAmount, poolPublicKey]);

  const ref = useDetectClickOutside({
    onTriggered: () => setIsOpen(false),
  });
  const handleSlippageValue = (slipVal: number) => {
    setIsOpen(false);
    setSlippageValue(slipVal);
  };
  const handleInputSlippageValue = (slipVal: string) => {
    let result = Number(slipVal);
    setSlippageValue(result);
  };
  const handleHasOrder = () => {
    const outputTokenDataRef = outputTokenData;
    setOutputTokenData(inputTokenData);
    setInputTokenData(outputTokenDataRef);
  };

  const handleSwap = async () => {
    let signature = "";

    if (publicKey && faucet) {
      if (inputAmount === undefined) {
        Notification({ type: "warning", title: "Warning", message: "Please input token amount" });
        return;
      }
      if (inputTokenData === undefined) {
        Notification({ type: "warning", title: "Warning", message: "Please choose token type" });
        return;
      }
      if (inputAmount > balance[inputTokenData.name] || inputAmount == 0) {
        Notification({ type: "warning", title: "Warning", message: "Input token amount is invalid" });
        return;
      }
      if (outputTokenData === undefined) {
        Notification({ type: "warning", title: "Warning", message: "Please choose token type" });
        return;
      }
      mainActionStore.setIsActionLoading(true);
      try {
        const {
          context: { slot: minContextSlot },
          value: { blockhash, lastValidBlockHeight },
        } = await connection.getLatestBlockhashAndContext();
        const provider = faucet.provider;
        const sdk = new SDK(provider);

        // let poolPublicKey = new PublicKey(pool_list[0].public_key);
        // const swapNamePair = inputTokenData.name + outputTokenData.name;

        // if (swapNamePair === "SAXUSDT" || swapNamePair === "USDTSAX") {
        //   poolPublicKey = new PublicKey(pool_list[1].public_key);
        // }
        const pool = await WeightedPool.load(sdk, new PublicKey(poolPublicKey));

        if (pool && vault) {
          Notification({ title: "Swapping...", message: "Preparing Transaction" });
          mainActionStore.setIsTXLoading(true);

          const { result: outAmount, tx } = await pool.swapAndResult({
            vault,
            fromMintK: new PublicKey(inputTokenData.mint),
            toMintK: new PublicKey(outputTokenData.mint),
            slippageTolerance: slippageValue / 100,
            amount: inputAmount,
          });
          signature = await sendTransaction(tx, connection, { minContextSlot });
          Notification({ type: "success", title: "Submited", message: "Transaction is submited " });

          await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
          const link = generateTransactionLink(signature, network);
          Notification({ type: "success", title: "Success", message: "Transaction is confirmed successfully", link });
          await pool.confirmTX(signature); // --> "Transaction success"
          getBalance();
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
    <Page name="swap">
      {mainActionStore.showModal === "token_modal" && <TokenModal />}
      <Container>
        <Col className="relative w-full items-center justify-center">
          <LaunchApp title="swap" />
          <div
            data-aos="fade-in"
            data-aos-duration="2000"
            data-aos-delay="1500"
            className="max-w-[540px] w-full bg-card_gradient6 rounded-[20px] p-[2px]"
          >
            <Col className="bg-copy_right bg-opacity-80 rounded-[20px] p-[30px] normal:px-[15px] normal:py-[20px] justify-between h-full space-y-[12px]">
              <Exchange direction={0} />
              <div className="p-2">
                <TbArrowsUpDown size={30} className="max-w-fit w-full m-auto cursor-pointer" onClick={() => handleHasOrder()} />
              </div>
              <Exchange direction={1} />
              <Row className="justify-between font-medium text-[16px]">
                <p className="pl-[20px] mobile:pl-[15px]">Slippage tolerance</p>
                <Row className="items-center space-x-2 pr-[20px] mobile:pr-[15px] ">
                  <p>{slippageValue}%</p>
                  <div ref={ref} className="relative cursor-pointer">
                    <GoSettings size={25} onClick={() => setIsOpen(!isOpen)} className="self-end" />
                    {isOpen && (
                      <div className="absolute z-50 top-7 -left-12 px-4 py-2 rounded-[10px] bg-card_normal w-[120px]">
                        {slippage_list.map((slippage, index) => (
                          <Row
                            key={`slippage_${index}`}
                            action={() => handleSlippageValue(slippage.value)}
                            className="justify-between items-center"
                          >
                            <p>{slippage.value}%</p>
                            {slippageValue === slippage.value && <GoCheck />}
                          </Row>
                        ))}
                        <Row className="justify-between items-center">
                          <input
                            type="number"
                            autoFocus
                            onChange={(e) => {
                              handleInputSlippageValue(e.target.value);
                            }}
                            className=" h-6 w-full bg-transparent  p-2 outline-none"
                          ></input>
                        </Row>
                      </div>
                    )}
                  </div>
                </Row>
              </Row>
              <Col className="pt-[24px] justify-center items-center">
                <Button action={handleSwap} className="w-full z-20">
                  Swap
                </Button>
              </Col>
            </Col>
          </div>
        </Col>
      </Container>
    </Page>
  );
};

export default observer(Swap);
