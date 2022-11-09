import { ethers } from "ethers";
import ABI from "./abi/eUSD-abi.json";

const getEUSDContract = (
  signer: ethers.providers.JsonRpcSigner | ethers.providers.JsonRpcProvider
) => {
  return new ethers.Contract(
    "0xCFEfC0AF27b4D00950F1857e3477F4706F8C4ac0",
    ABI,
    signer
  );
};

export { getEUSDContract };
