import { ethers } from "ethers";
import ABI from "./abi/eUSD-abi.json";

const getEUSDContract = (
  signer: ethers.providers.JsonRpcSigner | ethers.providers.JsonRpcProvider
) => {
  return new ethers.Contract(
    "0xa5DAB67e17F5EF0dABEe57B12b37c44e94abE681",
    ABI,
    signer
  );
};

export { getEUSDContract };
