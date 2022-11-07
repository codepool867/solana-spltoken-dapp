import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import { Border, Col, Container, Image, Row } from "components";
import { Social } from "views";
import { formatWalletAddress, handleAdjustOverflow, menu_list, network } from "utils";

const SOLAX_LOGO = "images/solax_logo@4x.png";

// default header of SOLA-X
const Header = () => {
  const router = useRouter();
  const wallet = useWallet();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    handleAdjustOverflow(isOpen);
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <Row className="items-center justify-between pt-[14px] pb-[20px]">
        <a href="https://solax.so" target="_blank" rel="noreferrer noopener" className="relative flex items-center">
          <Image src={SOLAX_LOGO} alt="SOLAX Logo" width={127} height={30} />
          <div className="absolute top-0 -left-4 w-[180px] h-[20px] bg-[#6481BB90] blur-[50px]" />
        </a>
        <div className="uppercase space-x-[30px] laptop:space-x-[20px] normal:hidden">
          {menu_list.map((menu, index) =>
            menu.path.includes("https") ? (
              <a
                key={`menu_${index}_${menu.path}`}
                href={menu.path}
                target="_blank"
                rel="noopener noreferrer"
                className="relative animate-border"
              >
                {menu.name}
              </a>
            ) : (
              menu.condition.includes(network) && (
                <Link
                  key={`menu_${index}_${menu.path}`}
                  href={menu.path}
                  onClick={() => setIsOpen(false)}
                  className={`relative animate-border ${router.route.includes(menu.path) && "font-bold text-label"}`}
                >
                  {menu.name}
                </Link>
              )
            )
          )}
        </div>
        <Row className="space-x-[20px] normal:hidden">
          <WalletMultiButton className="h-[54px] rounded-full bg-primary_gradient uppercase font-bold text-center text-[16px]">
            {wallet.publicKey ? formatWalletAddress(wallet.publicKey) : "Connect Wallet"}
          </WalletMultiButton>
          <div className="flex tablet:hidden">
            <Social />
          </div>
        </Row>
        <div
          role="button"
          aria-label="menu"
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 hidden normal:flex justify-center items-center rounded-full bg-primary_gradient active:bg-primary_gradient_active"
        >
          <div className="w-6 flex items-center justify-center relative">
            <span
              aria-hidden="true"
              className={`${isOpen ? "translate-y-0 rotate-45" : "-translate-y-1"} absolute w-full h-[3px] rounded-md bg-current transform`}
            ></span>

            <span
              aria-hidden="true"
              className={`${isOpen ? "translate-y-0 -rotate-45" : "translate-y-1"} absolute w-full h-[3px] rounded-md bg-current transform`}
            ></span>
          </div>
        </div>
      </Row>
      <Border className="border-[#ffffff17]" />
      <div className={`${!isOpen ? "translate-x-0 -translate-y-[300px] h-0" : "translate-x-0 h-[calc(100vh-74px)]"}`}>
        <Col className="pt-[30px] items-center">
          <WalletMultiButton className="rounded-full bg-primary_gradient uppercase font-bold text-center text-[16px]">
            {wallet.publicKey ? formatWalletAddress(wallet.publicKey) : "Connect Wallet"}
          </WalletMultiButton>
        </Col>
        <Col className="h-[70%] items-center justify-center uppercase space-y-[50px]">
          {menu_list.map((menu, index) =>
            menu.path.includes("https") ? (
              <a
                key={`menu_${index}_${menu.path}`}
                href={menu.path}
                target="_blank"
                rel="noopener noreferrer"
                className="relative animate-border"
              >
                {menu.name}
              </a>
            ) : (
              <Link
                key={`menu_${index}_${menu.path}`}
                href={menu.path}
                onClick={() => setIsOpen(false)}
                className={`relative animate-border ${router.route === menu.path && "font-bold text-label"}`}
              >
                {menu.name}
              </Link>
            )
          )}
        </Col>
        <Col className="items-center space-y-[67px]">
          <Social />
        </Col>
      </div>
    </Container>
  );
};

export default Header;
