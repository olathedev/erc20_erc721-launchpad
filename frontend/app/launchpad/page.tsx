// import { ConnectKitButton } from "connectkit";
"use client";
import Erc20Form from "@/components/launchpad/Erc20Form";
import Erc721form from "@/components/launchpad/Erc721form";
import { useGetErc20s, useGetErc721 } from "@/hooks/use-factory.read";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Launchpad = () => {
  const [activeFormTab, setActiveFormTab] = useState("erc20");

  const { tokens, isPending, refetchTokens } = useGetErc20s();
  console.log("tokenss", tokens);

  const { nfts, loadingnft, refetchNfts } = useGetErc721();

  const onCopy = (address: string) => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        toast.success("Token address copied");
      })
      .catch((err) => {
        toast.error("Failed to copy address");
      });
  };

  return (
    <main className="container mx-auto px-20">
      <nav className="flex justify-between items-center py-6">
        <h2 className="text-lg">
          launch<span className="text-gray-400">pad</span>.
        </h2>

        <div className="">
          <ConnectButton />
        </div>
      </nav>

      <div className="mt-8 w-full flex flex-col items-center">
        <div className="p-1 bg-gray-200 w-56 rounded flex gap-3 cursor-pointer">
          <span
            className={`py-1 px-2 rounded-sm text-sm ${
              activeFormTab === "erc20" && "bg-white text-gray-800"
            } w-1/2 text-center transition-all duration-200 ease-in-out`}
            onClick={() => setActiveFormTab("erc20")}
          >
            ERC20
          </span>

          <span
            className={`py-1 px-2 rounded-sm text-sm ${
              activeFormTab === "erc721" && "bg-white text-gray-800"
            } w-1/2 text-center transition-all duration-200 ease-in-out`}
            onClick={() => setActiveFormTab("erc721")}
          >
            ERC721
          </span>
        </div>

        <div className="mt-10 w-2/5">
          {activeFormTab === "erc20" && <Erc20Form refetch={refetchTokens} />}
          {activeFormTab === "erc721" && <Erc721form refetch={refetchNfts} />}
        </div>
      </div>

      <div className="pt-16 pb-6 flex items-center gap-3 text-sm ">
        <span className="px-4 text-teal-600 py-2 border-b font-medium">
          ERC20 Tokens
        </span>

        <span>Nfts</span>
      </div>

      <div className="w-full">
        {}
        {isPending ? (
          <div className="">Loading...</div>
        ) : (
          <div className="grid grid-cols-3 gap-4 w-full ">
            {
              // @ts-ignore
              tokens?.map((token: any, index: number) => (
                <div
                  className="bg-white border border-gray-100 sh p-4 rounded-xl"
                  key={index}
                >
                  <div className="flex gap-3 ">
                    <div className="h-12 w-12 rounded-full bg-teal-600"></div>
                    <div className="">
                      <h4 className="text-gray-800">BLT TOKEN</h4>
                      <p className="text-sm text-gray-400">300000000</p>
                    </div>
                  </div>

                  <div
                    className="my-4 bg-teal-800/20 rounded-lg py-1 text-gray-500 px-3 text-sm flex justify-between cursor-pointer"
                    onClick={() => onCopy(token?.tokenAddress)}
                  >
                    {`${token?.tokenAddress.slice(0, 8)}...${token?.tokenAddress.slice(-6)}`}

                    <span className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4 text-teal-800"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                        />
                      </svg>
                    </span>
                  </div>

                  <a
                    href={`https://sepolia.etherscan.io/address/${token?.tokenAddress}`}
                    target="_blank"
                    className="flex text-sm text-teal-800 font-medium items-center gap-2 cursor-pointer"
                  >
                    Open on etherscan
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                </div>
              ))
            }
          </div>
        )}
        {/* <p>Nfts</p>
        {loadingnft ? (
          <div className="">Loading...</div>
        ) : (
          // @ts-ignore
          nfts?.map((token: any, index: number) => (
            <div className="" key={index}>
              {token}
            </div>
          ))
        )} */}
      </div>
    </main>
  );
};

export default Launchpad;
