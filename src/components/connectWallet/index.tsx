/* eslint-disable @next/next/no-img-element */
// import AlertDialog from "@components/AlertDialog";
// import Dropdown from "@components/Dropdown";
// import { truncateEthAddress } from "@/util/helpers";
// import ModalService from "@util/modalService";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { ethers } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";

import Dropdown from "@/components/dropdown";

import { truncateEthAddress } from "@/utils/helpers";
const availableWallets = ["MetaMask", "Coinbase Wallet", "Brave Wallet"];
const availableChains = ["BNB", "ARB-ETH", "FTM", "MATIC", "ETH", "OETH"];

export default function ConnectWallet() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [{ chains, connectedChain }] = useSetChain();
  const [, setProvider] = useState<ethers.providers.Web3Provider | null>();
  useEffect(() => {
    if (wallet) {
      const currentChain = chains.find((c) => c.id === connectedChain?.id);
      // if (currentChain === undefined) {
      //   ModalService.open(
      //     <AlertDialog
      //       open
      //       variant="error"
      //       title="Unsupported network"
      //       description="The app does not support the network that your wallet is connected to. Please switch to a different network and reconnect."
      //       confirmText="Got it"
      //       onConfirm={(toggle: () => void) => {
      //         toggle();
      //       }}
      //     />
      //   );
      //   disconnect({
      //     label: wallet?.label as unknown as string,
      //   });
      }
    }, [wallet, connectedChain, chains, disconnect]);

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, "any"));
    }
  }, [wallet]);

  const currentChain = chains.find((c) => c.id === connectedChain?.id);
  console.log(currentChain)
  return wallet?.provider ? (
    <div className="h-10 flex border-gray-300 border rounded py-1 pl-3 pr-2 bg-white gap-3">
      {wallet?.accounts[0].ens && (
        <Image
          src={wallet?.accounts[0].ens.avatar as unknown as string}
          alt="ENS Avatar"
        />
      )}
      {availableChains.find((el) => el === currentChain?.token) && (
        <Image
          src={`/icons/${currentChain?.token}.svg`}
          alt={currentChain?.token || ""}
          width={15}
          height={15}
        />
      )}
      <div className="flex flex-col items-start">
        <div className="text-xs flex gap-2 font-bold text-gray-700">
          <p>
            {wallet.accounts[0].balance
              ? parseFloat(
                  Object.values(wallet.accounts[0].balance as object)[0]
                )?.toFixed(4)
              : "0.0"}{" "}
            <span>{currentChain?.token}</span>
          </p>
        </div>
        <div className="text-xs flex gap-2 text-gray-400 dark:text-blue-gray-900">
          {wallet.accounts[0].address && (
            <div>
              {truncateEthAddress(wallet.accounts[0].address)} (
              {currentChain?.label})
            </div>
          )}
        </div>
      </div>
      {availableWallets.find((el) => el === wallet?.label) && (
        <Image
          src={`/icons/${wallet.label}.svg`}
          alt=""
          width={20}
          height={20}
        />
      )}
      <Dropdown
        disabled={false}
        classes="w-5 h-8 flex items-center py-4"
        items={[
          {
            text: "Disconnect",
            onClick: () => disconnect({ label: wallet.label }),
          },
        ]}
      ></Dropdown>
    </div>
  ) : (
    <div>
      <button
        type="button"
        className="h-10 flex border rounded py-1 px-2 bg-blue-gray-50 items-center lg:px-10 dark:text-blue-gray-900"
        disabled={connecting}
        onClick={async () => {
          await connect();
        }}
      >
        Connect wallet
      </button>
    </div>
  );
}
