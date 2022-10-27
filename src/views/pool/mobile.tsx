import React, { type FC, type PropsWithChildren } from "react";
import { useRouter } from "next/router";

import { BsDownload } from "react-icons/bs";

import { Button, Col, Grid, Image, Row } from "components";
import { usePoolDetail } from "contexts";
import { type PairProps, pool_list, type SearchProps, type GridStatusProps } from "utils";

const PoolMobile: FC<PropsWithChildren & SearchProps & GridStatusProps> = ({ searchValue, gridStatus }) => {
  const router = useRouter();
  const { setPoolDetail } = usePoolDetail();

  const result = pool_list.filter((pool) => {
    if (pool) {
      if (!searchValue) return true;
      return pool.pairs
        .map((pair) => {
          if (
            pair.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            pair.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
            pair.mint.includes(searchValue)
          )
            return true;
        })
        .includes(true);
    }
  });

  const handleRoute = (pairs: PairProps[]) => {
    setPoolDetail(pairs);
    const pairNames = pairs.map((pair) => {
      return pair.name;
    });
    const dynamicRoute = pairNames.toString().replaceAll(",", "-");
    router.push(`pools/${dynamicRoute}`);
  };
  let gridStyle = "z-50 w-full  grid-cols-1 max-w-[800px] laptop:max-w-[560px] gap-6";
  if (gridStatus) {
    gridStyle = " w-full grid-cols-2 laptop:grid-cols-1 laptop:max-w-[560px] gap-6";
  }
  return (
    <Grid animate="fade-in" delay="2000" className={gridStyle}>
      {result.length > 0 ? (
        result.map((pool, index) => (
          <div
            key={`pool_mobile_${index}`}
            className="w-full px-[28px] normal:px-[16px] py-[20px] normal:py-[12px] bg-card_normal rounded-[20px]"
          >
            <Col className="justify-between h-full">
              <Row className="justify-between text-[16px] last:text-[14px] leading-[31px]">
                <p className="uppercase font-medium text-left">Pools</p>
                <Row className="space-x-2 items-center justify-end flex-wrap">
                  <Row className="-space-x-2">
                    {pool.pairs.map((pair, index) => (
                      <Image key={`pair_logo_${index}`} src={pair.icon} alt={pair.alt} width={30} height={30} />
                    ))}
                  </Row>
                  <Row className="flex-wrap justify-end whitespace-nowrap">
                    {pool.pairs.map((pair, index) => (
                      <p key={`pair_name_${index}`}>
                        {index === 0 ? "" : "/"} {pair.name}
                      </p>
                    ))}
                  </Row>
                </Row>
              </Row>
              <Row className="justify-between text-[16px] leading-[31px]">
                <p className="uppercase font-medium text-left">Liquidity</p>
                <div>${pool.liquidity.toLocaleString()}</div>
              </Row>
              <Row className="justify-between text-[16px] leading-[31px]">
                <p className="uppercase font-medium text-left">Volume 30d</p>
                <div>${pool.volume_30d.toLocaleString()}</div>
              </Row>
              <Row className="justify-between text-[16px] leading-[31px]">
                <p className="uppercase font-medium text-left">Fees 30d</p>
                <div>${pool.fees_30d.toLocaleString()}</div>
              </Row>
              <Row className="justify-between text-[16px] leading-[31px]">
                <p className="uppercase font-medium text-left">APR 30d</p>
                <div>{pool.apr_30d.toFixed(2)}%</div>
              </Row>
              <Button action={() => handleRoute(pool.pairs)} className="mt-4 w-full">
                <Row className="items-center justify-center space-x-2">
                  <BsDownload size={20} />
                  <p>Deposit</p>
                </Row>
              </Button>
            </Col>
          </div>
        ))
      ) : (
        <div className="w-full px-[28px] normal:px-[16px] py-[20px] normal:py-[12px] bg-card_normal rounded-[20px]">
          <p className="text-center">No results found.</p>
        </div>
      )}
    </Grid>
  );
};

export default PoolMobile;
