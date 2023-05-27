import { Spinner } from '@chakra-ui/react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import {
  useAddress,
  useChainId,
  useContract,
  useContractRead,
} from '@thirdweb-dev/react';
import { BigNumber, utils } from 'ethers';
import { ChangeEvent, useEffect, useState } from 'react';

import ChangeNetworkFrom from '@/components/ChangeNetwork/From';
import NextImage from '@/components/NextImage';

import { token_address } from '@/utils/contrants';

export const Bridge = () => {
  const [sendAmount, setSendAmount] = useState<number>();
  const [balance, setBalance] = useState<number>(0);
  const address = useAddress();
  const chainFromID = useChainId();
  const [chainToID, setChainToID] = useState<number>(0);

  const { contract: contractT, isLoading: isLoadingT, error: ErrorT } = useContract(
    token_address(chainFromID || 5)
  );

  const { data } = useContractRead(contractT, 'balanceOf', address);
  const { data: symbol } = useContractRead(contractT, 'symbol');

  function handleMaxOut(): void {
    setSendAmount(balance);
  }
  function handleSend(e: ChangeEvent<HTMLInputElement>): void {
    //   const value = e.target.value.replace(/\+|-/gi, '')
    //   const value_num = Number(value)
    //   value_num > 0 && value_num <= tokenBalance && setSendAmount(value_num)
  }
  useEffect(() => {
    const balance = data?._hex && BigNumber.from(data?._hex);
    balance && setBalance(Number(utils.formatEther(balance)) || 0);
  }, [data]);

    useEffect(() => {
    const id= chainFromID && chainFromID === 8001 ? 5 : 8001;
    setChainToID(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainToID]);

  if (isLoadingT) {
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
    <div className='p-6 flex flex-col'>
      <ChangeNetworkFrom chainID={chainToID || 5} />
      <div className='h-48'>
        {ErrorT ? (
          <Alert status='error' className='rounded-md'>
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Error with importing contract</AlertDescription>
          </Alert>
        ) : (
          <div className='relative'>
            <input
              placeholder=''
              className='w-[100%] rounded-md bg-gray-100 bg-opacity-5 px-4 py-3 text-base text-white outline-non border-white border-opacity-10'
              type='number'
              pattern='^-?[0-9]\d*\.?\d*$'
              value={sendAmount}
              max={balance}
              onChange={(e) => handleSend(e)}
            />
            {symbol && (
              <>
                <span className='text-white absolute right-12 top-3'>
                  {symbol}
                </span>
                <div className='w-9 h-9 rounded-full bg-white absolute right-2 top-2 flex items-center justify-center'>
                  <NextImage
                    src='/icons/eETH.svg'
                    alt='symbol'
                    width={15}
                    height={15}
                  />
                  <div className='w-6 h-6 absolute bottom-0 -right-1'>
                    <NextImage
                      src={`/icons/${symbol}.svg`}
                      layout='fill'
                      alt={symbol}
                    />
                  </div>
                </div>
              </>
            )}
            <button className='text-white underline p-2 text-sm' onClick={handleMaxOut}>
              Max {balance.toFixed(2)}
            </button>
          </div>
        )}
        <span className='text-white pt-4'>To : {chainToID === 5 ? 'Binance Smart Chain Testnet' : 'Ethereum Goerli'}</span>
      </div>
      <button className='self-center mt-2 w-60 items-center justify-items-center rounded-full border border-transparent bg-green-100 px-4 py-2 text-base font-medium text-blue-900 shadow-sm hover:bg-green-200 focus:outline-none '>
        Send
      </button>
    </div>
  );
};