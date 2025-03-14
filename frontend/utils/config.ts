// export const contractAddress = "0x7C5088075F540c4DCeE49940Ef46DF0b1716f3d9";

import { erc20Abi } from "viem";
import rawabi from "./abi/ERC20Factory.json";

export const abi = rawabi.abi;
export const contract_address = "0xE075ca52659F6Ee2c18Db1Fa1B7F45e2C035CC12";

export const wagmiContractConfig = {
  address: contract_address,
  abi: abi,
} as const;
