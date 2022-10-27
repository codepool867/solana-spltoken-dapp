import React, { type FC, type PropsWithChildren, useState } from "react";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { Image, Row } from "components";
import { pool_list, type SearchProps, table_head_list } from "utils";

// todo: It is not used, now. It might need later

const PoolDesktop: FC<PropsWithChildren & SearchProps> = ({ searchValue }) => {
  const [pageNum, setPageNum] = useState(1);
  const startOffSet = (pageNum - 1) * 10;
  const endOffSet = startOffSet + 10;

  const handleNext = () => {
    if (pageNum < Math.ceil(pool_list.length / 10)) {
      setPageNum(pageNum + 1);
    }
  };

  const handlePrev = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  return (
    <div data-aos="fade-in" data-aos-duration="2000" data-aos-delay="2000" className="z-50 max-w-[887px] w-full overflow-x-auto hidden">
      <table className="w-full bg-card_normal rounded-[20px] overflow-hidden">
        <thead className="bg-border_gradient">
          <tr>
            {table_head_list.map((table_head, index) => (
              <th
                key={`pools_table_${index}`}
                className={`${index === 0 ? "pl-[43px] normal:pl-[32px] mobile:pl-[8px] text-left" : "text-left normal:text-center"} ${
                  index === 4 && "pr-[40px] laptop:pr-[5px]"
                } ${
                  table_head.width
                } pt-[21px] mobile:pt-[12px] pb-[12px] mobile:pb-[8px] uppercase font-medium text-left text-[16px] text-black leading-[31px]`}
              >
                {table_head.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pool_list.slice(startOffSet, endOffSet).map((pool, index) => (
            <tr
              key={`pool_tr_${index}`}
              className="font-medium text-[16px] last:text-[14px] normal:text-center leading-[192.5%] hover:bg-slate-600 cursor-pointer"
            >
              <td className="py-[8px] pl-[43px] normal:pl-[32px] mobile:pl-[8px] text-left">
                <Row className="space-x-2 items-center flex-wrap">
                  <Row>
                    {pool.pairs.map((pair, index) => (
                      <Image key={`pair_logo_${index}`} src={pair.icon} alt={pair.alt} width={20} height={20} />
                    ))}
                  </Row>
                  <Row>
                    {pool.pairs.map((pair, index) => (
                      <p key={`pair_name_${index}`} className="whitespace-nowrap">
                        {index === 0 ? "" : "/"} {pair.name}
                      </p>
                    ))}
                  </Row>
                </Row>
              </td>
              <td className="py-[8px]">${pool.liquidity.toLocaleString()}</td>
              <td className="py-[8px]">${pool.volume_30d.toLocaleString()}</td>
              <td className="py-[8px]">${pool.fees_30d.toLocaleString()}</td>
              <td className="py-[8px] laptop:pr-[5px]">{pool.apr_30d.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td
              colSpan={5}
              className="space-x-[10px] pt-[36px] mobile:pt-[22px] pr-[80px] laptop:px-[20%] pb-[33px] mobile:pb-[24px] text-right laptop:text-center"
            >
              <p className="inline-flex font-semibold text-[16px] last:text-[14px] leading-[192.5%]">
                {(pageNum - 1) * 10 + 1}-{pageNum === Math.ceil(pool_list.length / 10) ? pool_list.length : 10 * pageNum} of{" "}
                {pool_list.length}
              </p>
              <AiOutlineLeft onClick={handlePrev} className={`${pageNum === 1 && "opacity-60"} inline-flex cursor-pointer`} />
              <AiOutlineRight
                onClick={handleNext}
                className={`${pageNum === Math.ceil(pool_list.length / 10) && "opacity-60"} inline-flex cursor-pointer`}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PoolDesktop;
