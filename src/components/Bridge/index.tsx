import { Spinner, useToast } from '@chakra-ui/react';
import {
  useAddress,
  useChainId,
  useContract,
  useContractRead,
} from '@thirdweb-dev/react';
import { BigNumber, utils } from 'ethers';
import { useEffect, useState } from 'react';

import ChangeNetworkFrom from '@/components/ChangeNetwork/From';
import { SwapForm } from '@/components/SwapForm';

import { ITokenName } from '@/type/token.types';
import { token_address, token_name } from '@/utils/contrants';

export const Bridge = () => {
  const [balance, setBalance] = useState<number>(0);
  const [tokenName, setTokenName] = useState<ITokenName>();
  const [chainToID, setChainToId] = useState<number>();
  const address = useAddress();
  const chainFromID = useChainId();
  const toast = useToast();
  const {
    contract: contractToken,
    isLoading: isLoadingToken,
    error: ErrorToken,
  } = useContract(token_address(chainFromID || 11155111));

  const { data } = useContractRead(contractToken, 'balanceOf', address);
  useEffect(() => {
    const balance = data?._hex && BigNumber.from(data?._hex);
    balance && setBalance(Number(utils.formatEther(balance)) || 0);
  }, [data]);

  useEffect(() => {
    if(chainFromID) {
    const tokenName =  token_name(chainFromID);
    setTokenName(tokenName);
     const chainToId =  chainFromID === 11155111 ? 80001 : 11155111;
     setChainToId(chainToId)
    }
  }, [chainFromID]);

  useEffect(() => {
    ErrorToken &&
      toast({
        title: 'Error',
        description: 'Error, please try later',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ErrorToken]);

  if (isLoadingToken) {
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
    <div className='p-6 flex flex-col justify-between'>
      <ChangeNetworkFrom chainID={chainFromID || 11155111} />
      {chainFromID && chainToID && tokenName && (
        <SwapForm
          chainFromID={chainFromID}
          chainToID={chainToID}
          balance={balance}
          tokenName={tokenName}
        />
      )}
    </div>
  );
};
