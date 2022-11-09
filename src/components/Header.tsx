import React from "react";
// @ts-ignore-next-line
import Logo from "../images/exegol.png";

const Header = ({ wallet, disconnect, connect, deposit, setDeposit }) => {
  return (
    <div className="sticky top-4 flex border-2 bg-egg-white rounded-xl mx-2 lg:max-w-[66%] lg:mx-auto">
      <img src={Logo} className="h-8 mx-2 lg:ml-2 my-auto" />
      <div className="hidden lg:flex items-center mr-2 lg:mr-4 font-logo text-xl">
        Exegol
      </div>

      <div className="flex space-x-2 items-center">
        {deposit ? (
          <>
            <div className="flex bg-active-button px-4 py-1 my-2 rounded cursor-pointer">
              Buy
            </div>
            <div
              className="flex bg-button hover:bg-active-button transition px-4 py-1 my-2 rounded cursor-pointer"
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
              className="flex bg-button hover:bg-active-button transition px-4 py-1 my-2 rounded cursor-pointer"
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
          <div className="hidden lg:flex bg-button px-2 my-2 rounded items-center">
            {wallet.accounts[0].balance
              ? parseFloat(wallet.accounts[0].balance.ETH).toFixed(6)
              : "???"}{" "}
            ETH
          </div>
        ) : (
          <></>
        )}
        <div className="flex bg-button hover:bg-active-button transition px-2 mx-2 my-2 rounded">
          {wallet ? (
            <>
              <button
                onClick={() => {
                  disconnect({ label: wallet.label });
                  window.localStorage.removeItem("exegolWallets");
                }}
              >
                {wallet.accounts[0].address.substring(0, 6) +
                  "..." +
                  wallet.accounts[0].address.substring(
                    wallet.accounts[0].address.length - 4,
                    wallet.accounts[0].address.length
                  )}
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
