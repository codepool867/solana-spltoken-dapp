import React from "react";

import { Row } from "components";

const CopyRight = () => {
  return (
    <Row className="h-full py-[30px] justify-center bg-copy_right font-medium text-[16px] text-[#ffffff24] leading-[31px]">
      &copy; {new Date().getFullYear()} All rights reserved.
    </Row>
  );
};

export default CopyRight;
