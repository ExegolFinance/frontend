import React from "react";

const GOERLI_KEY =
  "https://goerli.infura.io/v3/4c2d94bd0a3c4836bba9bf3a279eafb3";

const Header = ({ wallet, disconnect, connect, deposit, setDeposit }) => {
  if (wallet) {
    console.log(wallet.accounts[0].balance);
  }
  return (
    <div className="sticky top-4 flex border-2 bg-egg-white rounded-xl max-w-[66%] mx-auto">
      <div className="flex items-center ml-2 mr-4 font-logo text-xl">
        The Aerarium
      </div>

      <div className="flex space-x-2 items-center">
        {deposit ? (
          <>
            <div className="flex bg-active-button px-4 py-1 my-2 rounded cursor-pointer">
              Buy
            </div>
            <div
              className="flex bg-button px-4 py-1 my-2 rounded cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setDeposit(false);
              }}
            >
              Sell
            </div>
          </>
        ) : (
          <>
            <div
              className="flex bg-button px-4 py-1 my-2 rounded cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setDeposit(true);
              }}
            >
              Buy
            </div>
            <div className="flex bg-active-button px-4 py-1 my-2 rounded cursor-pointer">
              Sell
            </div>
          </>
        )}
      </div>

      <div className="flex ml-auto">
        {wallet ? (
          <div className="flex bg-button px-2 my-2 rounded items-center">
            {wallet.accounts[0].balance.ETH
              ? wallet.accounts[0].balance.ETH
              : "???"}{" "}
            ETH
          </div>
        ) : (
          <></>
        )}
        <div className="flex bg-button px-2 mx-2 my-2 rounded">
          {wallet ? (
            <>
              <button onClick={() => disconnect({ label: wallet.label })}>
                {wallet.accounts[0].address}
              </button>
            </>
          ) : (
            <button onClick={() => connect()}>Connect</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
