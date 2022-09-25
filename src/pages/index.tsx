import React, { useEffect, useState } from "react";

import { ethers } from "ethers";
import Header from "../components/Header";
import DepositModal from "../components/Deposit";
import WithdrawModal from "../components/Withdraw";

import { init, useConnectWallet, useSetChain } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GOERLI_KEY =
  "https://goerli.infura.io/v3/4c2d94bd0a3c4836bba9bf3a279eafb3";

const injected = injectedModule();

init({
  wallets: [injected],
  chains: [
    {
      id: "0x5",
      token: "ETH",
      label: "Goerli",
      rpcUrl: GOERLI_KEY,
    },
  ],
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    },
  },
});

const IndexPage = () => {
  const [deposit, setDeposit] = useState(true);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [tx, setTx] = useState("");

  const openEtherscan = (tx) => {
    if (window) {
      // @ts-ignore-next-line
      window.open(`https://goerli.etherscan.io/tx/${tx}`, "_blank").focus();
    }
  };

  useEffect(() => {
    if (tx) {
      toast.success(
        <p>
          Transaction submitted!
          <br />
          Click to open Etherscan.
        </p>,
        {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          onClick: () => {
            openEtherscan(tx);
          },
        }
      );
    }
  }, [tx]);

  useEffect(() => {
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, "any"));
    }
  }, [wallet]);

  return (
    <div className="bg-egg-white h-screen overflow-y-clip">
      <ToastContainer position="top-right" />
      <Header
        wallet={wallet}
        connect={connect}
        disconnect={disconnect}
        deposit={deposit}
        setDeposit={setDeposit}
      />

      <div className="flex w-full h-full items-start mt-24 justify-center">
        <div className="flex flex-col p-2 rounded-xl bg-white min-w-[33%] items-center justify-center space-y-2 shadow">
          {!wallet ? (
            <span className="text-2xl">Connect a wallet first.</span>
          ) : (
            <>
              {deposit && provider ? (
                <DepositModal
                  signer={provider.getUncheckedSigner()}
                  setTx={setTx}
                />
              ) : provider ? (
                <WithdrawModal
                  signer={provider.getUncheckedSigner()}
                  setTx={setTx}
                />
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
