import { BigNumber, ethers } from "ethers";
import React, { useEffect, useState } from "react";

import { getEUSDContract } from "../utils/eUSD";

const Stats = () => {
  const [exchangeRate, setExchangeRate] = useState("???");
  const [TVL, setTVL] = useState("???");

  useEffect(() => {
    const web3 = new ethers.providers.AlchemyProvider(
      "goerli",
      process.env.ALCHEMY_KEY
    );
    const contract = getEUSDContract(web3);

    contract.exchangeRate().then((res: BigNumber) => {
      setExchangeRate((res.toNumber() / Math.pow(10, 6)).toString());
    });
    contract.totalSupply().then((res: BigNumber) => {
      setTVL((res.toNumber() / Math.pow(10, 6)).toFixed(2).toString());
    });
  }, []);

  return (
    <div className="flex flex-col p-2 rounded-xl bg-white w-full lg:max-w-[33%] items-center justify-center space-y-2 shadow">
      <div className="grid grid-flow-col space-x-24 text-center">
        {/* Stat 1 */}
        <div>
          <div className="text-xl font-light">Current Exchange Rate</div>
          <div className="font-logo text-2xl">{exchangeRate} USDC/eUSD</div>
        </div>

        {/* Stat 2 */}
        <div>
          <div className="text-xl font-light">APY</div>
          <div className="font-logo text-2xl">20%</div>
        </div>

        {/* Stat 3 */}
        <div className="hidden xl:block">
          <div className="text-xl font-light">Total Supply</div>
          <div className="font-logo text-2xl">{TVL} eUSD</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
