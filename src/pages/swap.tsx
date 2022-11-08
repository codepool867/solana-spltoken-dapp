import React, { useEffect, useState } from "react";

import { useDetectClickOutside } from "react-detect-click-outside";
import { GoSettings, GoCheck } from "react-icons/go";
import { TbArrowsUpDown } from "react-icons/tb";

import { Button, Col, Container, LaunchApp, Page, Row } from "components";
import { useMainAction } from "contexts/MainActionContext";
import { useTokenInfo } from "contexts/TokenInfoContext";
import { Exchange, TokenModal } from "views";
import { slippage_list } from "utils";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSDKInit } from "contexts/SDKInitContext";
import { Keypair, PublicKey } from "@solana/web3.js";
import { SDK, Vault, WeightedPool } from "solax-sdk";
// swap page
const Swap = () => {
  const { showModal, setIsActionLoading } = useMainAction();
  useEffect(() => {
    setIsActionLoading(false);
  }, []);
  const { signTransaction, publicKey } = useWallet();
  // const { faucet } = useSDKInit();
  const { inputAmount, inputTokenData, outputTokenData, slippageValue, setSlippageValue } = useTokenInfo();
  const [hasOrder, setHasOrder] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const ref = useDetectClickOutside({
    onTriggered: () => setIsOpen(false),
  });
  const handleSlippageValue = (slipVal: number) => {
    setIsOpen(false);
    setSlippageValue(slipVal);
  };
  const handleInputSlippageValue = (slipVal: string) => {
    let result = Number(slipVal);
    if (result > 1) result = 1;
    setSlippageValue(result);
  };
  // handle swap function
  const handleSwap = async () => {
    // if (faucet && inputTokenData && inputAmount && outputTokenData) {
    //   const provider = faucet.provider;
    //   const sdk = new SDK(provider);
    //   const vaultKP = Keypair.generate(); //todo:
    //   const poolKP = Keypair.generate(); //todo:
    //   const vault = new Vault(sdk, vaultKP.publicKey);
    //   const pool = new WeightedPool(sdk, poolKP.publicKey); //const pool = await WeightedPool.load(sdk, poolKP.publicKey);
    //   const { result: outAmount, tx } = await pool.swapAndResult({
    //     vault,
    //     fromMintK: new PublicKey(inputTokenData.mint),
    //     toMintK: new PublicKey(outputTokenData.mint),
    //     amount: inputAmount,
    //     userKP: vaultKP,
    //   });
    //   console.log("Out Amount:", outAmount);
    //   if (signTransaction) {
    //     const signed = await signTransaction(tx); // tx.sign([walletKP]);
    //     const signature = await provider.connection.sendRawTransaction(signed.serialize());
    //     await pool.confirmTX(signature);
    //   }
    // }
    // console.log(inputAmount, "inputAmount");
    // console.log(inputTokenData, "inputTokenData");
  };

  return (
    <Page name="swap">
      {showModal === "token_modal" && <TokenModal />}
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
              <Exchange direction={0} order={hasOrder} />
              <div className="p-2">
                <TbArrowsUpDown size={30} className="max-w-fit w-full m-auto cursor-pointer" onClick={() => setHasOrder(!hasOrder)} />
              </div>
              <Exchange direction={1} order={!hasOrder} />
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

export default Swap;
