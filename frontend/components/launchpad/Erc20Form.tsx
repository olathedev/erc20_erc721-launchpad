import { useCreateErc20 } from "@/hooks/use-factory.write";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const Erc20Form = ({ refetch }: { refetch: () => void }) => {
  const { createErc20, creatingEr20, hash } = useCreateErc20();
  const { address } = useAccount();

  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [initialSupply, setInitialSupply] = useState("");

  useEffect(() => {
    if (hash) {
      setTokenName("");
      setInitialSupply("");
      setTokenSymbol("");
      refetch();
    }
  }, [hash]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      alert("connect wallet");
      return;
    }
    const supply = BigInt(initialSupply) * BigInt(10 ** 18);

    const data = {
      tokenName,
      tokenSymbol,
      supply,
    };
    await createErc20(data);
    // refetch();

    console.log({ tokenName, tokenSymbol, initialSupply });
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="w-full">
        <p className="text-sm font-medium text-gray-600 mb-1">Token name</p>
        <input
          type="text"
          className="py-2 px-4 border w-full border-gray-300 rounded-xl text-sm"
          placeholder="Bee Token.."
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
        />
      </div>

      <div className="w-full flex gap-4 items-center">
        <div className="flex-1 w-full">
          <p className="text-sm font-medium text-gray-600 mb-1">Token Symbol</p>
          <input
            type="text"
            className="py-2 px-4 border w-full border-gray-300 rounded-xl text-sm"
            placeholder="BTK"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
          />
        </div>

        <div className="flex-1 w-full">
          <p className="text-sm font-medium text-gray-600 mb-1">
            Initial supply
          </p>
          <input
            type="number"
            className="py-2 px-4 border w-full border-gray-300 rounded-xl text-sm"
            placeholder="2000"
            value={initialSupply}
            onChange={(e) => setInitialSupply(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        className="cursor-pointer mt-2 w-full py-3 rounded-xl bg-teal-800 text-gray-100 text-sm"
      >
        {creatingEr20 ? "loading.." : "Create Token"}
      </button>
    </form>
  );
};

export default Erc20Form;
