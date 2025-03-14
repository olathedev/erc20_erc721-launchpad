import { useCreateErc20, useCreateErc721 } from "@/hooks/use-factory.write";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const Erc721form = ({ refetch }: { refetch: () => void }) => {
  const { createErc721, creatingEr20, hash } = useCreateErc721();
  const { address } = useAccount();

  const [name, setname] = useState("");
  const [symbol, setsymbol] = useState("");
  const [initialSupply, setInitialSupply] = useState("");

  useEffect(() => {
    if (hash) {
      refetch();
    }
  }, [hash]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      alert("connect wallet");
      return;
    }

    const data = {
      name,
      symbol,
    };
    await createErc721(data);
    console.log({ name, symbol, initialSupply });
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="w-full">
        <p className="text-sm font-medium text-gray-600 mb-1">Name</p>
        <input
          type="text"
          className="py-2 px-4 border w-full border-gray-300 rounded-xl text-sm"
          placeholder="Nft name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
      </div>

      <div className="w-full">
        <p className="text-sm font-medium text-gray-600 mb-1">Symbol</p>
        <input
          type="text"
          className="py-2 px-4 border w-full border-gray-300 rounded-xl text-sm"
          placeholder="nft symbol"
          value={symbol}
          onChange={(e) => setsymbol(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="cursor-pointer mt-2 w-full py-3 rounded-xl bg-teal-800 text-gray-100 text-sm"
      >
        {creatingEr20 ? "loading.." : "Mint Nft"}
      </button>
    </form>
  );
};

export default Erc721form;
