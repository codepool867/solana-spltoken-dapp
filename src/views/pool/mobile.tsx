import React, { useCallback, useEffect, useRef, useState, type FC, type PropsWithChildren } from "react";
import { useRouter } from "next/router";

import { BsDownload } from "react-icons/bs";
import { observer } from "mobx-react-lite";
import { Button, Col, Grid, Image, Row } from "components";
import { useMainAction } from "contexts/MainActionContext";
import { usePoolDetail } from "contexts/PoolDetailContext";
import type { PairProps, SearchProps, GridStatusProps } from "utils";
import poolStore from "../../store/poolStore";

const PoolMobile: FC<PropsWithChildren & SearchProps & GridStatusProps> = ({ searchValue, gridStatus }) => {
  const router = useRouter();
  const { isActionLoading } = useMainAction();

  const result = poolStore.pools.filter((pool) => {
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
  const observer = useRef<IntersectionObserver>();
  const lastPoolElementRef = useCallback(
    (node: any) => {
      if (isActionLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && poolStore.hasMore) {
          poolStore.resetPools();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isActionLoading, poolStore.hasMore]
  );

  const handleRoute = (pairs: PairProps[]) => {
    // setPoolDetail(pairs);
    const pairNames = pairs.map((pair) => {
      return pair.name;
    });
    const dynamicRoute = pairNames.toString().replaceAll(",", "-");
    router.push(`pools/${dynamicRoute}`);
  };
  let gridStyle = "z-50 w-full  grid-cols-1 max-w-[560px] laptop:max-w-[560px] gap-6";
  if (gridStatus && result.length > 1) {
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
              <Row className="justify-between text-[18px] last:text-[14px] leading-[31px]">
                <Row className="space-x-2 w-1/3 items-center  flex-wrap w-50">
                  <Row className="-space-x-2">
                    {pool.pairs.map((pair, index) => (
                      <Image key={`pair_logo_${index}`} className="rounded-full" src={pair.icon} alt={pair.alt} width={30} height={30} />
                    ))}
                  </Row>
                </Row>
                <Col className="w-2/5">
                  <p className="font-medium">{`${pool.pairs[0].name}-${pool.pairs.length}Pool`}</p>
                  <Row className="flex-wrap whitespace-nowrap font-medium text-[14px] text-gray-400">
                    {pool.pairs.map((pair, index) => (
                      <p key={`pair_name_${index}`}>
                        {index === 0 ? "" : "/"} {pair.name}
                      </p>
                    ))}
                  </Row>
                </Col>
                <Col>
                  <p className="uppercase font-medium text-[14px] text-gray-500">apr</p>
                  <div className="text-[20px] ">{pool.apr_30d.toFixed(2)}%</div>
                </Col>
              </Row>
              <Row className="justify-between text-[16px] last:text-[14px] leading-[31px]">
                <Col>
                  <p className="uppercase font-medium text-gray-400">Liquidity</p>
                  <div className="text-right">${pool.liquidity.toLocaleString()}</div>
                </Col>
                <Col>
                  <p className="uppercase font-medium text-gray-400">Volume 30d</p>
                  {index === result.length - 1 ? (
                    <div ref={lastPoolElementRef} className="text-[16px] text-right">
                      ${pool.liquidity.toLocaleString()}
                    </div>
                  ) : (
                    <div className="text-[16px] text-right">${pool.liquidity.toLocaleString()}</div>
                  )}
                </Col>
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

export default observer(PoolMobile);
