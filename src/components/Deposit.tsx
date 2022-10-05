import React, { useEffect, useState } from "react";
import { useSetChain } from "@web3-onboard/react";

import { BigNumber, ethers } from "ethers";
import { getUSDCContract } from "../utils/USDC";
import { getEUSDContract } from "../utils/eUSD";

const DepositModal = ({
  signer,
  setTx,
}: {
  signer: ethers.providers.JsonRpcSigner;
  setTx: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();

  const [USDC, setUSDC] = useState(0);
  const [allowance, setAllowance] = useState("0");
  const [needApprove, setNeedApprove] = useState(false);
  const [deposit, setDeposit] = useState("0");
  const [error, setError] = useState<string>("");
  const [exchangeRate, setExchangeRate] = useState(-1);
  const decimals = 6;

  const getBalances = async () => {
    const address = await signer.getAddress();
    const contract = getUSDCContract(signer);
    const eUSD = getEUSDContract(signer);
    const USDCBalance: BigNumber = await contract.balanceOf(address);
    const USDCAllowance: BigNumber = await contract.allowance(
      address,
      eUSD.address
    );

    setExchangeRate((await eUSD.exchangeRate()) / Math.pow(10, 6));
    setAllowance(
      (USDCAllowance.toNumber() / Math.pow(10, decimals)).toString()
    );
    if (USDCAllowance.toNumber() === 0) setNeedApprove(true);
    setUSDC(USDCBalance.toNumber() / Math.pow(10, decimals));
  };

  const setDepositMax = () => {
    setDeposit(USDC.toString());
  };

  const depositUSDC = async () => {
    const contract = getEUSDContract(signer);

    try {
      const tx = await contract.mint(
        parseFloat(deposit) * Math.pow(10, decimals)
      );
      setTx(tx);
    } catch (e) {
      console.log(e);
      setError("Transaction declined");
    }
  };

  const approveUSDC = async () => {
    const contract = getUSDCContract(signer);
    const eUSD = getEUSDContract(signer);

    try {
      const approveAmount: BigNumber =
        deposit === "0"
          ? ethers.constants.MaxUint256
          : BigNumber.from(parseFloat(deposit) * Math.pow(10, decimals));

      const tx = await contract.approve(eUSD.address, approveAmount);
      setTx(tx);

      const receipt = await tx.wait();
      if (receipt.status == 0) {
        setError("Transaction reverted");
      }
    } catch {
      setError("Transaction declined");
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
            {error}
          </div>
        ) : (
          <></>
        )}
        <span className="ml-auto">
          Available:<span className="font-logo text-lg"> {USDC} USDC</span>
        </span>

        <div className="flex space-x-2">
          <input
            type={"number"}
            value={deposit}
            onChange={(e) => {
              setDeposit(e.target.value);
              if (e.target.value > allowance) {
                setNeedApprove(true);
              } else {
                setNeedApprove(false);
              }
            }}
            className="px-2 py-2 w-full rounded-xl border"
          />
          <div
            onClick={setDepositMax}
            className="bg-button hover:bg-active-button transition px-2 rounded self-center cursor-pointer"
          >
            MAX
          </div>
        </div>

        {exchangeRate != -1 ? (
          <div className="flex flex-col mt-2 ml-auto text-right text-lg">
            <div>
              <span className="font-light">You will get </span>
              <span className="font-logo">
                {deposit
                  ? (parseFloat(deposit) / exchangeRate).toFixed(2)
                  : (0).toFixed(2)}{" "}
                eUSD
              </span>
            </div>
          </div>
        ) : (
          <></>
        )}

        {needApprove ? (
          <div
            className="w-full border bg-egg-white shadow-inner hover:bg-button transition rounded-xl mt-4 text-center px-2 text-lg cursor-pointer"
            onClick={approveUSDC}
          >
            Approve
          </div>
        ) : (
          <div
            className="w-full border bg-egg-white shadow-inner hover:bg-button transition rounded-xl mt-4 text-center px-2 text-lg cursor-pointer"
            onClick={depositUSDC}
          >
            Buy eUSD
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositModal;
