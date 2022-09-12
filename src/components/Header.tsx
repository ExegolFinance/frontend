import React, { useState } from "react";

import { ethers } from "ethers";
import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";

const GOERLI_KEY =
  "https://goerli.infura.io/v3/4c2d94bd0a3c4836bba9bf3a279eafb3";

const injected = injectedModule();

const onboard = Onboard({
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

const Header = ({ setSigner }) => {
  const [address, setAddress] = useState<string>();

  const connect = async () => {
    const wallets = await onboard.connectWallet();
    if (wallets[0]) {
      const ethersProvider = new ethers.providers.Web3Provider(
        wallets[0].provider,
        "any"
      );

      const signer = ethersProvider.getSigner();
      setSigner(signer);
      const address = await signer.getAddress();
      setAddress(address);
    }
  };

  return (
    <div className="sticky flex bg-gray-100">
      <div className="flex">Gen3</div>

      <div className="flex ml-auto">
        {address ? address : <button onClick={connect}>Connect</button>}
      </div>
    </div>
  );
};

export default Header;
