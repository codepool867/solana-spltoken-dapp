import React, { useState } from "react";

import { useDetectClickOutside } from "react-detect-click-outside";
import { GoSettings, GoCheck } from "react-icons/go";
import { TbArrowsUpDown } from "react-icons/tb";

import { Button, Col, Container, LaunchApp, Page, Row } from "components";
import { useMainAction, useTokenInfo } from "contexts";
import { Exchange, TokenModal } from "views";
import { slippage_list } from "utils";

// swap page
const Swap = () => {
  const { showModal } = useMainAction();
  const { inputAmount, slippageValue, setSlippageValue } = useTokenInfo();
  const [hasOrder, setHasOrder] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const ref = useDetectClickOutside({
    onTriggered: () => setIsOpen(false),
  });

  // handle swap function
  const handleSwap = () => {
    console.log(inputAmount, "inputAmount");
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
                <Row action={() => setIsOpen(!isOpen)} className="items-center space-x-2 pr-[20px] mobile:pr-[15px] ">
                  <p>{slippageValue}%</p>
                  <div ref={ref} className="relative cursor-pointer">
                    <GoSettings size={25} onClick={() => setIsOpen(!isOpen)} className="self-end" />
                    {isOpen && (
                      <div className="absolute z-50 top-7 -left-12 px-4 py-2 rounded-[10px] bg-card_normal w-[120px]">
                        {slippage_list.map((slippage, index) => (
                          <Row
                            key={`slippage_${index}`}
                            action={() => setSlippageValue(slippage.value)}
                            className="justify-between items-center"
                          >
                            <p>{slippage.value}</p>
                            {slippageValue === slippage.value && <GoCheck />}
                          </Row>
                        ))}
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
