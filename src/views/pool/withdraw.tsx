import React, { type ChangeEvent, type FC, useState } from "react";

import { Button, Col, Image, Row } from "components";
import { floatNumRegex, type PoolDetailProps } from "utils";

const PoolWithdraw: FC<PoolDetailProps> = ({ poolDetail }) => {
  const [percentageAmount, setPercentageAmount] = useState(100);
  const [values, setValues] = useState({});

  // handle to save values of input
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: (Number(value) * percentageAmount) / 100 });
  };

  // handle deposit function
  const handleWithdraw = () => {
    console.log(values, "values");
  };

  return (
    <Col className="space-y-8 divide-gray-700 divide-y">
      <Col>
        <p className="text-[14px] text-gray-400 py-2">Select the percentage of your position to withdraw:</p>
        <Row className="space-x-2">
          <Row className="px-6 py-2 w-[120px] rounded-md bg-[#33313180]">
            <input
              type="number"
              min={0}
              max={100}
              pattern={`${floatNumRegex}`}
              placeholder="0"
              readOnly
              value={percentageAmount}
              className={`w-full bg-transparent outline-none text-center text-[18px] font-bold cursor-default`}
            />
            <p className="text-[18px] font-bold cursor-default">%</p>
          </Row>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={percentageAmount}
            onChange={(e: any) => {
              setPercentageAmount(e.target.value);
            }}
            className="range-slider w-full"
          />
        </Row>
      </Col>
      {poolDetail.map((pool, index) => (
        <Col key={`pool_detail_${index}`} className="space-y-4 pt-8">
          <Row className="justify-between space-x-2">
            <div className="select-none">
              <Row className="items-center space-x-2 w-[120px] px-3 py-2 rounded-[20px] bg-[#33313180]">
                <Image src={pool.icon} alt={pool.alt} width={25} height={25} />
                <p>{pool.name}</p>
              </Row>
            </div>
            <input
              type="number"
              name={pool.name}
              min={0}
              pattern={`${floatNumRegex}`}
              placeholder="0.00"
              step="any"
              readOnly
              onChange={handleChange}
              className={`w-full bg-transparent outline-none text-right text-[24px] font-bold`}
            />
          </Row>
          <p className="text-[14px] text-gray-500 px-1">Max Withdrawal: 0</p>
        </Col>
      ))}
      <Button action={handleWithdraw} className="mt-4">
        Withdraw
      </Button>
    </Col>
  );
};

export default PoolWithdraw;
