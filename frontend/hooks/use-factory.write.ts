"use client";

import { wagmiContractConfig } from "@/utils";
import { useAccount, useWriteContract } from "wagmi";

export const useCreateErc20 = () => {
  const { address } = useAccount();
  const { data: hash, writeContract, isPending } = useWriteContract();

  const createErc20 = async (data: {
    tokenName: string;
    tokenSymbol: string;
    supply: bigint;
  }) => {
    writeContract({
      ...wagmiContractConfig,
      functionName: "createToken",
      args: [data.tokenName, data.tokenSymbol, data.supply],
    });
  };

  return {
    createErc20,
    creatingEr20: isPending,
    hash,
  };
};

export const useCreateErc721 = () => {
  const { address } = useAccount();
  const { data: hash, writeContract, isPending } = useWriteContract();

  const createErc721 = async (data: { name: string; symbol: string }) => {
    writeContract({
      ...wagmiContractConfig,
      functionName: "createERC721",
      args: [data.name, data.symbol],
    });
  };

  return {
    createErc721,
    creatingEr20: isPending,
    hash,
  };
};
