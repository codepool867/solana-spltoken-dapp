import React from "react";

import { Row } from "components";
import { SOCIAL_LIST } from "utils";

const Social = () => {
  return (
    <Row className="items-center space-x-[20px]">
      {SOCIAL_LIST.map((social, index) => (
        <a key={`social_${index}`} aria-label={social.label} href={social.path} target="_blank" rel="noopener noreferrer">
          <social.icon size={17} className="hover:text-label" />
        </a>
      ))}
    </Row>
  );
};

export default Social;
