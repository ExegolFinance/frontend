import React, { useState } from "react";

import { ethers } from "ethers";
import Header from "../components/Header";
import DepositModal from "../components/Deposit";
import WithdrawModal from "../components/Withdraw";

const GOERLI_KEY =
  "https://goerli.infura.io/v3/4c2d94bd0a3c4836bba9bf3a279eafb3";

const IndexPage = () => {
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
  const [deposit, setDeposit] = useState(true);

  if (signer == undefined) {
    return (
      <div>
        <Header setSigner={setSigner} />
        <div className="flex bg-slate-200 w-screen h-screen items-center justify-center">
          <div className="flex flex-col p-2 rounded-xl bg-slate-50 min-w-[33%] items-center justify-center space-y-2">
            <div className="flex rounded w-full justify-center">
              Connect a wallet to use dApp.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header setSigner={setSigner} />

      <div className="flex bg-slate-200 w-screen h-screen items-center justify-center">
        <div className="flex flex-col p-2 rounded-xl bg-slate-50 min-w-[33%] items-center justify-center space-y-2">
          <div className="flex rounded w-full">
            {deposit ? (
              <div className="flex w-full justify-center bg-slate-200 rounded cursor-pointer">
                Deposit
              </div>
            ) : (
              <div
                className="flex w-full justify-center rounded cursor-pointer"
                onClick={() => {
                  setDeposit(true);
                }}
              >
                Deposit
              </div>
            )}

            {!deposit ? (
              <div className="flex w-full justify-center bg-slate-200 rounded cursor-pointer">
                Withdraw
              </div>
            ) : (
              <div
                className="flex w-full justify-center rounded cursor-pointer"
                onClick={() => {
                  setDeposit(false);
                }}
              >
                Withdraw
              </div>
            )}
          </div>
          {deposit ? (
            <DepositModal signer={signer} />
          ) : (
            <WithdrawModal signer={signer} />
          )}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
