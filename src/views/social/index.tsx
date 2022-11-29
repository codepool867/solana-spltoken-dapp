import React from "react";

import { Row } from "components";
import { social_list } from "utils";

const Social = () => {
  return (
    <Row className="items-center space-x-[20px]">
      {social_list.map((social, index) => (
        <a key={`social_${index}`} aria-label={social.label} href={social.path} target="_blank" rel="noopener noreferrer">
          <social.icon size={17} className="hover:text-label" />
        </a>
      ))}
    </Row>
  );
};

export default Social;
