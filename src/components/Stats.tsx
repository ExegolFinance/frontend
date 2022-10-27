import { BigNumber, ethers } from "ethers";
import React, { useEffect, useState } from "react";

import { getEUSDContract } from "../utils/eUSD";

const Stats = () => {
  const [TVL, setTVL] = useState("???");

  useEffect(() => {
    const web3 = new ethers.providers.JsonRpcProvider(
      "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    );
    const contract = getEUSDContract(web3);

    contract.totalSupply().then((res: BigNumber) => {
      setTVL((res.toNumber() / Math.pow(10, 6)).toFixed(2).toString());
    });
  }, []);

  return (
    <div className="flex flex-col p-2 rounded-xl bg-white w-full lg:max-w-[33%] items-center justify-center space-y-2 shadow">
      <div className="grid grid-flow-col space-x-24 text-center">
        {/* Stat 1 */}
        <div>
          <div className="font-light">APY</div>
          <div className="font-logo text-lg">20%</div>
        </div>

        {/* Stat 2 */}
        <div className="hidden xl:block">
          <div className="font-light">Total Supply</div>
          <div className="font-logo text-lg">{TVL} eUSD</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
