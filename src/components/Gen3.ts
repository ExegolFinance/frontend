import { ethers } from "ethers";
import ABI from "./abi.json";

const getGen3Contract = (signer: ethers.providers.JsonRpcSigner) => {
  return new ethers.Contract(
    "0xa878D90a684a500C5a79b0A7440f2F8AB3ffDd76",
    ABI,
    signer
  );
};

export { getGen3Contract };
