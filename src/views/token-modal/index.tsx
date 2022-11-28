import React, { useCallback, useEffect, useRef, useState } from "react";

import { TfiClose } from "react-icons/tfi";

import { Image, Modal, Col, Row } from "components";
import { useTokenInfo } from "contexts";
import { formatBalanceToString, prefer_token_list, SelectedTokenType, type PairProps } from "utils";
import { observer } from "mobx-react-lite";
import swapTokenStore from "store/swapTokenStore";
import mainActionStore from "store/mainActionStore";
import Router, { useRouter } from "next/router";
const TokenModal = () => {
  const { selectedTokenType, setInputTokenData, setOutputTokenData, inputTokenData, outputTokenData, balance } = useTokenInfo();
  const [searchValue, setSearchValue] = useState<string>("");
  //handle server side pagination infinite scroll

  const preferTokens = prefer_token_list;

  const observer = useRef<IntersectionObserver>();
  const router = useRouter();
  const lastTokenElementRef = useCallback((node: any) => {
    if (mainActionStore.isActionLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && swapTokenStore.hasMore) {
        swapTokenStore.resetTokens();
      }
    });
    if (node) observer.current.observe(node);
  }, []);
  // handle choose token function

  const handleChooseToken = (token: PairProps) => {
    if (selectedTokenType === SelectedTokenType.Input) {
      // setInputTokenData(token);
      const { from, to } = router.query;
      router.push(`/swap?from=${token.mint}&to=${to}`);
    } else {
      // setOutputTokenData(token);
      const { from, to } = router.query;
      router.push(`/swap?from=${from}&to=${token.mint}`);
    }
    mainActionStore.setShowModal(false);
  };
  const result = swapTokenStore.swapTokens.filter((token) => {
    if (token) {
      if (selectedTokenType === SelectedTokenType.Input && outputTokenData) {
        if (token.mint === outputTokenData.mint) {
          return false;
        }
        if (outputTokenData.name !== "SAX") {
          if (token.name !== "SAX") {
            return false;
          }
        }
      }
      if (selectedTokenType === SelectedTokenType.Output && inputTokenData) {
        if (token.mint === inputTokenData.mint) {
          return false;
        }
        if (inputTokenData.name !== "SAX") {
          if (token.name !== "SAX") {
            return false;
          }
        }
      }

      if (!searchValue) return true;
      if (
        token.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
        token.mint.includes(searchValue)
      )
        return true;
    }
  });

  return (
    <Modal>
      <Col className="relative space-y-4 h-[80vh]">
        <Row className="justify-between items-center">
          <p className="text-white text-[20px] font-bold">Select a token</p>
          <TfiClose size={18} onClick={() => mainActionStore.setShowModal(false)} className="cursor-pointer hover:scale-105" />
        </Row>
        {/* search input */}
        <input
          type="search"
          autoFocus
          placeholder="Search name or mint address"
          onChange={(e: any) => setSearchValue(e.target.value)}
          className="rounded-md h-12 w-full bg-transparent border border-white p-2 outline-none"
        />
        <div className="grid grid-cols-4 gap-2 last:gap-1">
          {/* prefer token list */}
          {preferTokens.map((prefer_token) => (
            <div
              key={`${prefer_token.mint}_${prefer_token.name}`}
              onClick={() => handleChooseToken(prefer_token)}
              className="p-1 border rounded-md text-[14px] last:text-[12px] hover:bg-copy_right hover:opacity-70 cursor-pointer"
            >
              <div className="flex items-center justify-center space-x-1">
                <Image src={prefer_token.icon} alt={prefer_token.alt} width={18} height={18} className="rounded-full" />
                <p>{prefer_token.symbol}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-1 border border-gray-500" />
        <div className={`space-y-4 -mx-4 px-4 overflow-y-auto `}>
          {/* token list */}
          {result.map((token, index) => (
            <Row
              key={`${token.mint}_${token.name}_${index}`}
              action={() => handleChooseToken(token)}
              className="items-center justify-between cursor-pointer hover:bg-gray-500 p-2 rounded-md"
            >
              <div className="flex items-center space-x-4">
                {token.icon && <Image src={token.icon} alt={token.alt} width={25} height={25} />}
                {index === result.length - 1 ? (
                  <p ref={lastTokenElementRef} key={`${token.mint}_p_${index}`}>
                    {token.name}
                  </p>
                ) : (
                  <p key={`${token.mint}_p_${index}`}>{token.name}</p>
                )}
              </div>
              <p className="text-gray-400 text-[12px]">{formatBalanceToString(balance[token.name])}</p>
            </Row>
          ))}
        </div>
      </Col>
    </Modal>
  );
};

export default observer(TokenModal);
