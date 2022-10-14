import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";

import { BigNumber, ethers } from "ethers";
import { getEUSDContract } from "../utils/eUSD";

import { useSetChain } from "@web3-onboard/react";

const WithdrawModal = ({
  signer,
  setTx,
}: {
  signer: ethers.providers.JsonRpcSigner;
  setTx: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();

  const [eUSD, setEUSD] = useState(0);
  const [deposit, setDeposit] = useState("0");
  const [withdrawFee, setWithdrawFee] = useState("???");
  const [liquidity, setLiquidity] = useState("???");
  const [error, setError] = useState(false);
  const decimals = 6;

  const getBalances = async () => {
    const address = await signer.getAddress();
    const contract = getEUSDContract(signer);
    const eUSDBalance: BigNumber = await contract.balanceOf(address);

    setEUSD(eUSDBalance.toNumber() / Math.pow(10, decimals));

    const withdrawFee =
      (await contract.getWithdrawFee(address)).toNumber() / Math.pow(10, 6);
    const maxFee = (await contract.maxFee()).toNumber() / Math.pow(10, 6);

    setWithdrawFee((withdrawFee * maxFee * 100).toFixed(2).toString());
    setLiquidity(
      (
        (await contract.availableLiquidity()).toNumber() /
        Math.pow(10, decimals)
      ).toString()
    );
  };

  const setDepositMax = () => {
    setDeposit(eUSD.toString());
  };

  const withdrawEUSD = async () => {
    setError(false);
    const contract = getEUSDContract(signer);

    try {
      const tx = await contract.withdraw(parseFloat(deposit) * Math.pow(10, 6));
      setTx(tx);
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
      <ReactTooltip />

      <div className="flex flex-col w-full">
        {error ? (
          <div className="flex w-full bg-red-500 text-white rounded justify-center">
            Something went wrong. Please try again or go to Discord for help.
          </div>
        ) : (
          <></>
        )}
        <span className="ml-auto">
          Available:<span className="font-logo text-lg"> {eUSD} eUSD</span>
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
            className="bg-button hover:bg-active-button transition px-2 rounded self-center cursor-pointer"
          >
            MAX
          </div>
        </div>

        <div className="flex flex-col mt-2 ml-auto text-right">
          <div>
            <span className="font-light">Withdrawal Fee: </span>
            <span className="font-logo">{withdrawFee}%</span>
            <svg
              data-tip="Withdrawal fee linearly decreases over time and will be 0% after 14 days."
              width="14"
              height="14"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
              className="inline ml-1 align-text-top"
            >
              <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm.053 17c.466 0 .844-.378.844-.845 0-.466-.378-.844-.844-.844-.466 0-.845.378-.845.844 0 .467.379.845.845.845zm.468-2.822h-.998c-.035-1.162.182-2.054.939-2.943.491-.57 1.607-1.479 1.945-2.058.722-1.229.077-3.177-2.271-3.177-1.439 0-2.615.877-2.928 2.507l-1.018-.102c.28-2.236 1.958-3.405 3.922-3.405 1.964 0 3.615 1.25 3.615 3.22 0 1.806-1.826 2.782-2.638 3.868-.422.563-.555 1.377-.568 2.09z" />
            </svg>
          </div>
          <div>
            <span className="font-light">Liquidity: </span>
            <span className="font-logo">{liquidity} USDC</span>
            <svg
              data-tip="Maximum possible withdrawal at the moment. Contact the team if you want to make a withdrawal larger than available liquidity."
              width="14"
              height="14"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
              className="inline ml-1 align-text-top"
            >
              <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm.053 17c.466 0 .844-.378.844-.845 0-.466-.378-.844-.844-.844-.466 0-.845.378-.845.844 0 .467.379.845.845.845zm.468-2.822h-.998c-.035-1.162.182-2.054.939-2.943.491-.57 1.607-1.479 1.945-2.058.722-1.229.077-3.177-2.271-3.177-1.439 0-2.615.877-2.928 2.507l-1.018-.102c.28-2.236 1.958-3.405 3.922-3.405 1.964 0 3.615 1.25 3.615 3.22 0 1.806-1.826 2.782-2.638 3.868-.422.563-.555 1.377-.568 2.09z" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col mt-2 ml-auto text-right text-lg">
          <div>
            <span className="font-light">You will get </span>
            <span className="font-logo">
              {deposit ? parseFloat(deposit).toFixed(2) : (0).toFixed(2)} USDC
            </span>
          </div>
        </div>

        {parseFloat(deposit) <= parseFloat(liquidity) ? (
          <div
            className="w-full border bg-egg-white shadow-inner hover:bg-button transition rounded-xl mt-4 text-center px-2 text-lg cursor-pointer"
            onClick={withdrawEUSD}
          >
            Sell eUSD
          </div>
        ) : (
          <div className="w-full disabled border bg-red-300 shadow-inner transition rounded-xl mt-4 text-center px-2 text-lg cursor-pointer">
            Not enough liquidity
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawModal;
