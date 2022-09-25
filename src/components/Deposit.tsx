import React, { useEffect, useState } from "react";

import { BigNumber, ethers } from "ethers";
import { getUSDCContract } from "./USDC";
import { getGen3Contract } from "./Gen3";

import { useSetChain } from "@web3-onboard/react";

const DepositModal = ({
  signer,
  setTx,
}: {
  signer: ethers.providers.JsonRpcSigner;
  setTx: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();

  const [USDC, setUSDC] = useState(0);
  const [deposit, setDeposit] = useState("0");
  const [error, setError] = useState(false);
  const decimals = 6;

  const getBalances = async () => {
    const address = await signer.getAddress();
    const contract = getUSDCContract(signer);
    const gen3Balance: BigNumber = await contract.balanceOf(address);

    setUSDC(gen3Balance.toNumber() / Math.pow(10, decimals));
  };

  const setDepositMax = () => {
    setDeposit(USDC.toString());
  };

  const depositUSDC = async () => {
    const contract = getGen3Contract(signer);

    try {
      const tx = await contract.mint(parseFloat(deposit) * Math.pow(10, 6));
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
        <span>Available: {USDC} USDC</span>

        <div className="flex space-x-2">
          <input
            type={"number"}
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
            className="px-2 py-4 w-full rounded"
          />
          <div
            onClick={setDepositMax}
            className="bg-slate-200 px-2 rounded self-center cursor-pointer"
          >
            MAX
          </div>
        </div>

        <div
          className="w-full bg-white hover:bg-slate-100 rounded-xl mt-4 text-center px-2 text-lg cursor-pointer"
          onClick={depositUSDC}
        >
          Deposit
        </div>
      </div>
    </div>
  );
};

export default DepositModal;
