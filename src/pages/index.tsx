import React, { useEffect, useState } from "react";

import { ethers } from "ethers";
import { init, useConnectWallet, useSetChain } from "@web3-onboard/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import injectedModule from "@web3-onboard/injected-wallets";
import walletConnectModule from "@web3-onboard/walletconnect";
import coinbaseWalletModule from "@web3-onboard/coinbase";
import ledgerModule from "@web3-onboard/ledger";
import trezorModule from "@web3-onboard/trezor";
import gnosisModule from "@web3-onboard/gnosis";

import Header from "../components/Header";
import DepositModal from "../components/Deposit";
import WithdrawModal from "../components/Withdraw";
import Stats from "../components/Stats";

const injected = injectedModule();
const ledger = ledgerModule();
const coinbaseWallet = coinbaseWalletModule({ darkMode: false });
const gnosis = gnosisModule();

const walletConnect = walletConnectModule({
  qrcodeModalOptions: {
    mobileLinks: ["rainbow", "metamask"],
  },
});

const trezor = trezorModule({
  email: "hello@exegol.fi",
  appUrl: "https://www.exegol.fi",
});

init({
  wallets: [injected, ledger, trezor, walletConnect, coinbaseWallet, gnosis],
  chains: [
    {
      id: "0xa4b1",
      token: "ETH",
      label: "Arbitrum One",
      namespace: "evm",
      rpcUrl: process.env.INFURA_URL
        ? process.env.INFURA_URL
        : "https://rpc.ankr.com/arbitrum",
    },
  ],
  connect: {
    showSidebar: false,
  },
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
  const [tx, setTx] = useState<any>();

  const openEtherscan = (tx) => {
    if (window) {
      // @ts-ignore-next-line
      window.open(`https://arbiscan.io/tx/${tx}`, "_blank").focus();
    }
  };

  useEffect(() => {
    if (tx) {
      toast.promise(
        tx.wait(),
        {
          pending: "Transaction submitted ⚡",
          success: "Transaction approved 🔥",
          error: "Transaction reverted 😓",
        },
        { onClick: () => openEtherscan(tx.hash) }
      );
    }
  }, [tx]);

  useEffect(() => {
    if (window && wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, "any"));
      window.localStorage.setItem("exegolWallets", wallet.label.toString());
    }
  }, [wallet]);

  useEffect(() => {
    if (window && window.localStorage.getItem("exegolWallets") != null) {
      connect({
        autoSelect: {
          // @ts-ignore-next-line
          label: window.localStorage.getItem("exegolWallets")?.toString(),
          disableModals: true,
        },
      });
    }
  }, []);

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

      <div className="flex flex-col w-full h-full items-center justify-start px-2 lg:px-0 mt-24 space-y-4">
        <Stats />
        <div className="flex flex-col p-2 rounded-xl bg-white w-full lg:max-w-[33%] items-center justify-center space-y-2 shadow">
          {!wallet ? (
            <span className="text-2xl">
              Connect a wallet to use <span className="font-logo">Exegol</span>.
            </span>
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

export function Head() {
  return (
    <>
      <title>Exegol Finance</title>
      <meta name="description" content="A decentralised hedge fund." />
    </>
  );
}
