import React, { useState } from "react";

import { ethers } from "ethers";

const GOERLI_KEY =
  "https://goerli.infura.io/v3/4c2d94bd0a3c4836bba9bf3a279eafb3";

const Header = ({ wallet, disconnect, connect }) => {
  return (
    <div className="sticky flex bg-gray-100">
      <div className="flex items-center mx-2">The Aerarium</div>

      <div className="flex ml-auto bg-slate-300 px-2 mx-2 my-2 rounded">
        {wallet ? (
          <button onClick={() => disconnect({ label: wallet.label })}>
            {wallet.accounts[0].address}
          </button>
        ) : (
          <button onClick={() => connect()}>Connect</button>
        )}
      </div>
    </div>
  );
};

export default Header;
