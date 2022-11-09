import { ethers } from "ethers";
import ABI from "./abi/ERC20-abi.json";

const getUSDCContract = (signer: ethers.providers.JsonRpcSigner) => {
  return new ethers.Contract(
    "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    ABI,
    signer
  );
};

export { getUSDCContract };
