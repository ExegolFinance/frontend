import { ethers } from "ethers";
import ABI from "./abi/ERC20-abi.json";

const getUSDCContract = (signer: ethers.providers.JsonRpcSigner) => {
  return new ethers.Contract(
    "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
    ABI,
    signer
  );
};

export { getUSDCContract };
