import React, { useCallback, useEffect, useRef, useState } from "react";

import { TfiClose } from "react-icons/tfi";

import { Image, Modal, Col, Row } from "components";
import { useMainAction } from "contexts/MainActionContext";
import { useTokenInfo } from "contexts/TokenInfoContext";
import { SelectedTokenType, type PairProps } from "utils";
import axios from "axios";
import useSwapTokens from "hooks/useSwapTokens";

const TokenModal = () => {
  const { setShowModal, isActionLoading } = useMainAction();
  const { selectedTokenType, setInputTokenData, setOutputTokenData, balance } = useTokenInfo();
  const [searchValue, setSearchValue] = useState<string>("");
  //handle server side pagination infinite scroll

  const [pageNumber, setPageNumber] = useState(1);
  const [preferTokens, setPreferTokens] = useState<PairProps[]>([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/preferToken",
    }).then((res) => {
      setPreferTokens(res.data);
    });
  }, []);
  const { hasMore, tokens } = useSwapTokens(pageNumber);
  const observer = useRef<IntersectionObserver>();
  const lastTokenElementRef = useCallback(
    (node: any) => {
      if (isActionLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isActionLoading, hasMore]
  );
  // handle choose token function

  const handleChooseToken = (token: PairProps) => {
    if (selectedTokenType === SelectedTokenType.Input) {
      setInputTokenData(token);
    } else {
      setOutputTokenData(token);
    }
    setShowModal(false);
  };
  const result = tokens.filter((token) => {
    if (token) {
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
          <TfiClose size={18} onClick={() => setShowModal(false)} className="cursor-pointer hover:scale-105" />
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
                {index === tokens.length - 1 ? (
                  <p ref={lastTokenElementRef} key={`${token.mint}_p_${index}`}>
                    {token.name}
                  </p>
                ) : (
                  <p key={`${token.mint}_p_${index}`}>{token.name}</p>
                )}
              </div>
              <p className="text-gray-400 text-[12px]">{balance[token.name]}</p>
            </Row>
          ))}
        </div>
      </Col>
    </Modal>
  );
};

export default TokenModal;
