import React, { type FC } from "react";

import { Image } from "components";
import type { TemplateViewProps } from "utils";

import Launch_SOLAX from "assets/images/launch_solax@4x.png";

// component for title part of swap & pools page
const LaunchApp: FC<TemplateViewProps> = ({ title }) => {
  return (
    <>
      <div className="absolute top-[10px] tablet:w-[435px] mobile:w-[316px]">
        <Image src={Launch_SOLAX} alt="Launch SOLAX" width={460} height={554} />
      </div>
      <p className="z-20 pt-[70px] tablet:pt-[60px] mobile:pt-[40px] pb-[30px] laptop:pb-[20px] uppercase font-bold text-center text-[80px] leading-[100px] tablet:text-[70px] tablet:leading-[88px] mobile:text-[42px] mobile:leading-[52px] bg-text_gradient3 bg-clip-text text-transparent animate-gradient">
        {title}
      </p>
    </>
  );
};

export default LaunchApp;
