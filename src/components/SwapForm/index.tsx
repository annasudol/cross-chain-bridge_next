/* eslint-disable no-console */
import { Spinner, useToast } from '@chakra-ui/react';
import { useAddress, useContract, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { FC, useEffect, useState } from 'react';

import NextImage from '@/components/NextImage';

import { ITokenName } from '@/type/token.types';
import { bridge_address } from '@/utils/contrants';
interface SwapFormProps {
  chainId: number;
  balance: number;
  tokenName: ITokenName;
}
export const SwapForm: FC<SwapFormProps> = ({
  chainId,
  balance,
  tokenName,
}) => {
  const [sendAmount, setSendAmount] = useState<string>();
  const address = useAddress();
  const [chainToID, setChainToID] = useState<string>();
  const toast = useToast();

  const { contract } = useContract(bridge_address(chainId));
  const { mutateAsync: swap, isLoading } = useContractWrite(contract, 'swap');
  // {chainId === 5 ? 'Binance Smart Chain Testnet' : 'Ethereum Goerli'}
  function handleMaxOut(): void {
    setSendAmount(balance.toString());
  }

  useEffect(() => {
    setChainToID(
      chainId === 5 ? 'Binance Smart Chain Testnet' : 'Ethereum Goerli'
    );
  }, [chainId]);

  async function handleSend(): Promise<void> {
    const sendAmountInWei = sendAmount && ethers.utils.parseUnits(sendAmount);
    console.log(sendAmountInWei, 'sendAmountInWei');
    try {
      const data = await swap([address, sendAmountInWei, 0, 5, 'eETH']);
      console.info('contract call success', data);

      toast({
        title: 'Success',
        description: `You swapped your tokens, not you need to redeem it on ${chainToID}`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      console.error('contract call failure', err);
      toast({
        title: 'Error',
        description: 'Error with swapping your tokens',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </div>
    );
  }

  return (
    <>
      <div>
        <div className='relative'>
          <input
            placeholder=''
            className='w-[100%] rounded-md bg-gray-100 bg-opacity-5 px-4 py-3 text-base text-white outline-non border-white border-opacity-10'
            type='text'
            pattern='^-?[0-9]\d*\.?\d*$'
            value={sendAmount}
            max={balance}
            min={0.05}
            onChange={(e) => setSendAmount(e.target.value)}
          />
          {tokenName && (
            <>
              <span className='text-white absolute right-12 top-3'>
                {tokenName}
              </span>
              <div className='w-9 h-9 rounded-full bg-white absolute right-2 top-2 flex items-center justify-center'>
                <NextImage src='/icons/gETH.svg' alt='token' layout='fill' />
                <div className='w-6 h-6 absolute bottom-0 -right-1'>
                  <NextImage
                    src={`/icons/${tokenName}.svg`}
                    layout='fill'
                    alt={tokenName}
                  />
                </div>
              </div>
            </>
          )}
          <button
            className='text-white underline p-2 text-sm'
            onClick={handleMaxOut}
          >
            Max {balance.toFixed(2)}
          </button>
        </div>

        <span className='text-white pt-4'>To : {chainToID}</span>
      </div>
      <button
        onClick={handleSend}
        className='self-center mt-2 w-60 items-center justify-items-center rounded-full border border-transparent bg-green-100 px-4 py-2 text-base font-medium text-blue-900 shadow-sm hover:bg-green-200 focus:outline-none '
      >
        Send
      </button>
    </>
  );
};
// TOKEN_ETH_ADDRESS='0xf121DaF9eDdF06F3f7DD56952F6BFd000BFffA61'
// TOKEN_BSC_ADDRESS='0x11E47a0465D3933E372fD4A2854e897934Fd14d7'
// TOKEN_MATIC_ADDRESS='0xD46B25771dbcd034772D0f2C5dECE94Cd3684435'

// BRIDGE_ETH_ADDRESS='0xA097413a69B55fe1aB8D6F0a4612CdAaA21dc725'
// BRIDGE_MATIC_ADDRESS='0xa2D60f2A08fF806446b971b19bAa71677c47a415'
// BRIDGE_BSC_ADDRESS='0xE88702C4B257f30a5929329191ae58A011f35172'
