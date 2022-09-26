import { WalletState } from "@web3-onboard/core";
import { BigNumber, ethers } from "ethers";
import React, { useEffect, useState } from "react";

import { getGen3Contract } from "./Gen3";

const Stats = () => {
  const [exchangeRate, setExchangeRate] = useState("???");

  useEffect(() => {
    const web3 = new ethers.providers.AlchemyProvider(
      "goerli",
      process.env.ALCHEMY_KEY
    );
    const contract = getGen3Contract(web3);

    contract.exchangeRate().then((res: BigNumber) => {
      setExchangeRate((res.toNumber() / Math.pow(10, 6)).toString());
    });
  }, []);

  return (
    <div className="flex flex-col p-2 rounded-xl bg-white min-w-[33%] items-center justify-center space-y-2 shadow">
      <div className="grid grid-flow-col space-x-24 text-center">
        {/* Stat 1 */}
        <div>
          <div className="text-2xl font-light">Current Exchange Rate</div>
          <div className="font-logo text-xl">{exchangeRate} USDC/eUSD</div>
        </div>

        {/* Stat 2 */}
        <div>
          <div className="text-2xl font-light">APY</div>
          <div className="font-logo text-xl">20%</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
