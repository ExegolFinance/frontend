import { ethers } from "ethers";
import ABI from "./USDC_abi.json";

const getUSDCContract = (signer: ethers.providers.JsonRpcSigner) => {
  return new ethers.Contract(
    "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
    ABI,
    signer
  );
};

export { getUSDCContract };
