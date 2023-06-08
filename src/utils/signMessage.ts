import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

async function getMessageHash(address: string, value: string, chainId: number, symbol: string) {
  const sendAmountInWei = ethers.utils.parseUnits(value);

  const messageHash = ethers.utils.solidityKeccak256(
    ["address", "address", "uint256", "uint256", "uint256", "string"],
    [address, address, sendAmountInWei, 0, chainId, symbol]);

  return messageHash;
}

export const signMessage = async (address: string, value: string, chainId: number, symbol: string) => {

  const sdk = ThirdwebSDK.fromPrivateKey('b0e129529d12bca1d2a23c48459e7c842033716f824c2aeb8c4628a099929c32', "ethereum");

  const message = await getMessageHash(address, value, chainId, symbol)
  //   // const signature = await sdk.wallet.sign(messageHash);
  const signature = await sdk.wallet.sign(message);
  return signature
}
