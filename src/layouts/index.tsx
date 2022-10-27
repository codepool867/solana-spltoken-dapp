import type { FC, PropsWithChildren } from "react";
import React from "react";
import dynamic from "next/dynamic";

import Header from "./header";
const Footer = dynamic(import("./footer"));

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className=" bg-[#000000]">
      <Header />
      <div className="min-h-[calc(100vh-460px)]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
