import { BigNumber, ethers } from "ethers";
import React, { useEffect, useState } from "react";

import { getEUSDContract } from "../utils/eUSD";
import { getStats } from "../utils/getStats";
import { nFormatter } from "../utils/nFormatter";

interface Stats {
  apy: number;
  aum: number;
}

const Stats = () => {
  const [TVL, setTVL] = useState("???");
  const [APY, setAPY] = useState("???");
  const [AUM, setAUM] = useState("???");

  useEffect(() => {
    const web3 = new ethers.providers.JsonRpcProvider(
      "https://rpc.ankr.com/arbitrum"
    );

    getstats();

    const contract = getEUSDContract(web3);

    contract.totalSupply().then((res: BigNumber) => {
      setTVL((res.toNumber() / Math.pow(10, 6)).toFixed(2).toString());
    });
  }, []);

  async function getstats() {
    const res: Stats = await getStats();

    setAPY(res.apy.toString());
    setAUM(res.aum.toString());
  }

  return (
    <div className="flex flex-col p-2 rounded-xl bg-white w-full lg:max-w-[33%] items-center justify-center space-y-2 shadow">
      <div className="grid grid-flow-col space-x-24 text-center">
        {/* Stat 1 */}
        <div>
          <div className="font-light">APY</div>
          <div className="font-logo text-lg">{APY}%</div>
        </div>

        {/* Stat 2 */}
        <div className="hidden xl:block">
          <div className="font-light">Total Supply</div>
          <div className="font-logo text-lg">{nFormatter(TVL, 2)} eUSD</div>
        </div>

        {/* Stat 3 */}
        <div>
          <div className="font-light">AUM</div>
          <div className="font-logo text-lg">${nFormatter(AUM, 2)}</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
