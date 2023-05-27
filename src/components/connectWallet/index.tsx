
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
  return wallet?.provider ? (
    <div className="h-10 flex justify-between border-white border rounded-full py-1 pl-4 pr-4 bg-blue-900/20 max-w-[230px]">
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
          className="mr-3"
          width={25}
          height={25}
        />
      )}
      <div className="flex flex-col items-start">
        <div className="text-xs flex gap-2 font-bold text-white">
          <p>
            {wallet.accounts[0].balance
              ? parseFloat(
                  Object.values(wallet.accounts[0].balance as object)[0]
                )?.toFixed(4)
              : "0.0"}{" "}
            <span>{currentChain?.token}</span>
          </p>
        </div>
        <div className="text-xs flex gap-2 text-gray-200">
          {wallet.accounts[0].address && (
            <div>
              {truncateEthAddress(wallet.accounts[0].address)}
            </div>
          )}
        </div>
      </div>
      {availableWallets.find((el) => el === wallet?.label) && (
        <Image
          src={`/icons/${wallet.label}.svg`}
          alt=""
          className="ml-4"
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
        className="h-10 flex border rounded-full py-1 px-4 bg-blue-900/20 items-center lg:px-10 text-white"
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
