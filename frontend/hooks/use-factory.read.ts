import { wagmiContractConfig } from "@/utils";
import { useAccount, useReadContract } from "wagmi";

export const useGetErc20s = () => {
  const { address } = useAccount();

  const { data, isPending, error, refetch } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getTokensByUser",
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  console.log(data);

  console.log(error);

  return {
    tokens: data,
    isPending,
    error,
    refetchTokens: refetch,
  };
};

export const useGetErc721 = () => {
  const { address } = useAccount();

  const { data, isPending, error, refetch } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getERC721TokensByUser",
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  return {
    nfts: data,
    loadingnft: isPending,
    error,
    refetchNfts: refetch,
  };
};
