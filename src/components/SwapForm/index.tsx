import {
  useAddress,
  useChainId,
  useContract,
  useContractWrite,
} from '@thirdweb-dev/react';
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
  const chainFromID = useChainId();
  const [chainToID, setChainToID] = useState<number>(5);

  const { contract } = useContract(bridge_address(chainId));
  const { mutateAsync: swap, isLoading } = useContractWrite(contract, 'swap');

  function handleMaxOut(): void {
    setSendAmount(balance.toString());
  }

  async function handleSend(): Promise<void> {
    const sendAmountInWei = sendAmount && ethers.utils.parseUnits(sendAmount);

    try {
      const data = await swap([
        address,
        sendAmountInWei,
        0,
        chainFromID,
        tokenName,
      ]);
      console.info('contract call successs', data);
    } catch (err) {
      console.error('contract call failure', err);
    }
  }

  useEffect(() => {
    const id = chainFromID && chainFromID === 8001 ? 5 : 8001;
    setChainToID(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainToID]);

  return (
    <div>
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
                <NextImage
                  src='/icons/eETH.svg'
                  alt='tokenName'
                  width={15}
                  height={15}
                />
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

        <span className='text-white pt-4'>
          To :{' '}
          {chainToID === 5 ? 'Binance Smart Chain Testnet' : 'Ethereum Goerli'}
        </span>
      </div>
      <button
        onClick={handleSend}
        className='self-center mt-2 w-60 items-center justify-items-center rounded-full border border-transparent bg-green-100 px-4 py-2 text-base font-medium text-blue-900 shadow-sm hover:bg-green-200 focus:outline-none '
      >
        Send
      </button>
    </div>
  );
};
// TOKEN_ETH_ADDRESS='0xf121DaF9eDdF06F3f7DD56952F6BFd000BFffA61'
// TOKEN_BSC_ADDRESS='0x11E47a0465D3933E372fD4A2854e897934Fd14d7'
// TOKEN_MATIC_ADDRESS='0xD46B25771dbcd034772D0f2C5dECE94Cd3684435'

// BRIDGE_ETH_ADDRESS='0xA097413a69B55fe1aB8D6F0a4612CdAaA21dc725'
// BRIDGE_MATIC_ADDRESS='0xa2D60f2A08fF806446b971b19bAa71677c47a415'
// BRIDGE_BSC_ADDRESS='0xE88702C4B257f30a5929329191ae58A011f35172'
