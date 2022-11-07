import React from "react";

import { Border, Col, Container, Image, Row } from "components";
import { CopyRight, Social } from "views";
import { contact_list, resource_list } from "utils";

const SOLAX_LOGO = "images/solax_logo@4x.png";

// default footer of SOLA-X
const Footer = () => {
  return (
    <div className="mt-[77px]">
      <Container>
        <Border className="border-[#ffffff17]" />
        <Row className="justify-between pt-[56px] pb-[38px]">
          <Row className="items-start space-x-[194px] tablet:space-x-[136px] normal:flex-col normal:space-x-0 normal:space-y-[48px]">
            <Image src={SOLAX_LOGO} alt="SOLAX Logo" width={127} height={30} />
            <Row className="space-x-[114px] last:space-x-[80px]">
              <div className="uppercase space-y-[11px]">
                <p className="font-bold text-label text-[16px] leading-[20px]">Resources</p>
                <Col className="space-y-[11px]">
                  {resource_list.map((resource, index) => (
                    <a
                      key={`resource_${index}`}
                      target="_blank"
                      href={resource.path}
                      rel="noopener noreferrer"
                      className="text-[14px] leading-[19px] hover:underline"
                    >
                      {resource.name}
                    </a>
                  ))}
                </Col>
              </div>
              <div className="space-y-[11px]">
                <p className="uppercase font-bold text-label text-[16px] leading-[20px]">Contact</p>
                {/* 140px */}
                <Col className="h-[80px] justify-between">
                  <Col className="space-y-[11px]">
                    {contact_list.map((contact, index) => (
                      <a key={`contact_${index}`} href={`mailto:${contact.name}`} className="text-[14px] leading-[19px] cursor-pointer">
                        {contact.name}
                      </a>
                    ))}
                  </Col>
                  <div className="hidden normal:flex">
                    <Social />
                  </div>
                </Col>
              </div>
            </Row>
          </Row>
          <div className="normal:hidden self-end">
            <Social />
          </div>
        </Row>
      </Container>
      <CopyRight />
    </div>
  );
};

export default Footer;
