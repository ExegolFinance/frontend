import { ethers } from "ethers";
import ABI from "./abi/eUSD-abi.json";

const getEUSDContract = (
  signer: ethers.providers.JsonRpcSigner | ethers.providers.JsonRpcProvider
) => {
  return new ethers.Contract(
    "0xcBc6653A3B6CBC5F49952fb2881Ac5264e497A2b",
    ABI,
    signer
  );
};

export { getEUSDContract };
