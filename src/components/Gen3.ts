import { ethers } from "ethers";
import ABI from "./abi.json";

const getGen3Contract = (
  signer: ethers.providers.JsonRpcSigner | ethers.providers.JsonRpcProvider
) => {
  return new ethers.Contract(
    "0xc4cB75b6251dd852D7c1Ff750A1a0f76b656BD06",
    ABI,
    signer
  );
};

export { getGen3Contract };
