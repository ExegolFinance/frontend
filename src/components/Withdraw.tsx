import React, { useState, useEffect } from "react";

import { BigNumber, ethers } from "ethers";
import { getGen3Contract } from "./Gen3";

import { useSetChain } from "@web3-onboard/react";

const WithdrawModal = ({
  signer,
  setTx,
}: {
  signer: ethers.providers.JsonRpcSigner;
  setTx: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();

  const [GEN3, setGEN3] = useState(0);
  const [deposit, setDeposit] = useState("0");
  const [error, setError] = useState(false);
  const decimals = 6;

  const getBalances = async () => {
    const address = await signer.getAddress();
    const contract = getGen3Contract(signer);
    const gen3Balance: BigNumber = await contract.balanceOf(address);

    setGEN3(gen3Balance.toNumber() / Math.pow(10, decimals));
  };

  const setDepositMax = () => {
    setDeposit(GEN3.toString());
  };

  const withdrawGen3 = async () => {
    setError(false);
    const contract = getGen3Contract(signer);

    try {
      const tx = await contract.burnG32(parseFloat(deposit) * Math.pow(10, 6));
      setTx(tx.hash);
    } catch {
      setError(true);
    }
  };

  const checkChain = async () => {
    if (connectedChain && connectedChain.id !== "0x5") {
      await setChain({ chainId: "0x5" });
    }
  };

  useEffect(() => {
    checkChain().then(() => {
      getBalances();
    });
  }, []);

  return (
    <div className="flex w-full">
      <div className="flex flex-col w-full">
        {error ? (
          <div className="flex w-full bg-red-500 text-white rounded justify-center">
            Something went wrong. Please try again or go to Discord for help.
          </div>
        ) : (
          <></>
        )}
        <span className="ml-auto">
          Available:<span className="font-logo text-lg"> {GEN3} eUSD</span>
        </span>

        <div className="flex space-x-2">
          <input
            type={"number"}
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
            className="px-2 py-2 w-full rounded-xl border"
          />
          <div
            onClick={setDepositMax}
            className="bg-button px-2 rounded self-center cursor-pointer"
          >
            MAX
          </div>
        </div>

        <div
          className="w-full border bg-egg-white shadow-inner hover:bg-button rounded-xl mt-4 text-center px-2 text-lg cursor-pointer"
          onClick={withdrawGen3}
        >
          Withdraw
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
