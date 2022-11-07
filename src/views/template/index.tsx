import type { FC } from "react";
import React from "react";
import { useRouter } from "next/router";

import { Button, Image } from "components";
import type { TemplateViewProps } from "utils";

const SOLA_X_Logo = "images/sola-x.png";

// view for template like 404 and 500 error page and coming-soon page
const Template: FC<TemplateViewProps> = ({ title }) => {
  const router = useRouter();

  return (
    <div className="h-screen">
      <div className="h-full flex flex-col justify-center items-center space-y-8">
        <div className="w-[256px] height-[256px] tablet:w-[204px] tablet:h-[204px] mobile:w-[128px] mobile:h-[128px]">
          <Image src={SOLA_X_Logo} alt="Logo of SOLAX" width={256} height={256} />
        </div>
        <div className="text-center font-bold text-[72px] laptop:text-[56px] tablet:text-[36px] mobile:text-[24px]">{title}</div>
        <Button action={() => router.push("/")}>Back to Home</Button>
      </div>
    </div>
  );
};

export default Template;
