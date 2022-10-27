import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { IoChevronBackCircleOutline } from "react-icons/io5";

import { Col, Container, Image, Page, Row } from "components";
import { usePoolDetail } from "contexts";
import { PoolDeposit, PoolWithdraw } from "views";
import { pool_list } from "utils";

// pool details page
const Liquidity = () => {
  const router = useRouter();
  const { type } = router.query;
  const { poolDetail, setPoolDetail } = usePoolDetail();
  const [ctaType, setCtaType] = useState("deposit");

  const pairNames = pool_list.map((pool) => {
    return pool.pairs.map((pair) => {
      return pair.name;
    });
  });

  useEffect(() => {
    pairNames.map((pair_name, index) => {
      if (type === pair_name.toString().replaceAll(",", "-")) {
        setPoolDetail(pool_list[index].pairs);
      }
    });
  }, [pairNames]);

  return (
    <Page name="pools">
      <Container className="py-10">
        {poolDetail && (
          <Col className="max-w-[560px] w-full mx-auto space-y-8">
            <Row action={() => router.back()} className="relative animate-border w-fit items-center space-x-2 cursor-pointer">
              <IoChevronBackCircleOutline fontSize={35} />
              <p className="uppercase text-[24px]">Back</p>
            </Row>
            <Col className="space-y-1">
              <p className="text-[36px] tablet:text-[24px] font-bold">{type} Pool</p>
              <Row className="-space-x-2">
                {poolDetail.map((pair, index) => (
                  <Image key={`pair_logo_${index}`} src={pair.icon} alt={pair.alt} width={40} height={40} />
                ))}
              </Row>
            </Col>
            <div className="mt-10 px-[28px] normal:px-[16px] py-[20px] normal:py-[12px] bg-card_normal rounded-[20px] divide-y">
              <Row className="items-center space-x-4 pb-6">
                <div
                  role="button"
                  onClick={() => setCtaType("deposit")}
                  className={`${ctaType !== "deposit" ? "text-gray-500" : "bg-[#33313180]"} p-2 rounded-lg text-[20px] font-medium`}
                >
                  Deposit
                </div>
                <div
                  role="button"
                  onClick={() => setCtaType("withdraw")}
                  className={`${ctaType !== "withdraw" ? "text-gray-500" : "bg-[#33313180]"} p-2 rounded-lg text-[20px] font-medium`}
                >
                  Withdraw
                </div>
              </Row>
              <div className="pt-4">
                {ctaType === "deposit" ? <PoolDeposit poolDetail={poolDetail} /> : <PoolWithdraw poolDetail={poolDetail} />}
              </div>
            </div>
          </Col>
        )}
      </Container>
    </Page>
  );
};

export default Liquidity;
