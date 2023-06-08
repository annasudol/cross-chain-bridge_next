import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { BigNumber, ethers } from "ethers";

async function getMessageHash(address: string, value: BigNumber, chainId: number, symbol: string) {

  const messageHash = ethers.utils.solidityKeccak256(
    ["address", "address", "uint256", "uint256", "uint256", "string"],
    [address, address, value, 0, chainId, symbol]);

  return messageHash;
}

export const signMessage = async (address: string, value: BigNumber, chainId: number, symbol: string) => {

  const sdk = ThirdwebSDK.fromPrivateKey('e861b3c80bf471c18c64b3a7022f46fa72b17e6f54453ceca56a0de44079a3a2', "ethereum");

  const message = await getMessageHash(address, value, chainId, symbol)
  //   // const signature = await sdk.wallet.sign(messageHash);
  const signature = await sdk.wallet.sign(message);
  return signature
}
