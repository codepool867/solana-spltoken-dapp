import React, { useState } from "react";

import { TfiClose } from "react-icons/tfi";

import { Image, Modal, Row } from "components";
import { useMainAction, useTokenInfo } from "contexts";
import { token_list, prefer_token_list, SelectedTokenType, type PairProps } from "utils";

const TokenModal = () => {
  const { setShowModal } = useMainAction();
  const { selectedTokenType, setInputTokenData, setOutputTokenData, balance } = useTokenInfo();
  const [searchValue, setSearchValue] = useState<string>("");

  // handle choose token function
  const handleChooseToken = (token: PairProps) => {
    if (selectedTokenType === SelectedTokenType.Input) {
      setInputTokenData(token);
    } else {
      setOutputTokenData(token);
    }
    setShowModal(false);
  };

  return (
    <Modal>
      <div className="relative space-y-4">
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
          {prefer_token_list.map((prefer_token) => (
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
        <div className={`space-y-4 -mx-4 px-4 overflow-y-auto h-[500px]`}>
          {/* token list */}
          {token_list
            .filter((token) => {
              if (token) {
                if (!searchValue) return true;
                if (
                  token.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                  token.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
                  token.mint.includes(searchValue)
                )
                  return true;
              }
            })
            .map((token) => (
              <Row
                key={`${token.mint}_${token.name}`}
                action={() => handleChooseToken(token)}
                className="items-center justify-between cursor-pointer hover:bg-gray-500 p-2 rounded-md"
              >
                <div className="flex items-center space-x-4">
                  {token.icon && <Image src={token.icon} alt={token.alt} width={25} height={25} />}
                  <p>{token.name}</p>
                </div>
                <p className="text-gray-400 text-[12px]">{balance[token.name]}</p>
              </Row>
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default TokenModal;
