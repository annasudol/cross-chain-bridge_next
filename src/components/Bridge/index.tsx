import { Spinner } from '@chakra-ui/react';
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
  const address = useAddress();
  const chainFromID = useChainId();

  const {
    contract: contractToken,
    isLoading: isLoadingToken,
    error: ErrorToken,
  } = useContract(token_address(chainFromID || 5));

  const { data } = useContractRead(contractToken, 'balanceOf', address);
  useEffect(() => {
    const balance = data?._hex && BigNumber.from(data?._hex);
    balance && setBalance(Number(utils.formatEther(balance)) || 0);
  }, [data]);

  useEffect(() => {
    const tokenName = chainFromID && token_name(chainFromID);
    if (tokenName) {
      setTokenName(tokenName);
    }
  }, [chainFromID]);

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
    <div className='p-6 flex flex-col'>
      <ChangeNetworkFrom chainID={chainFromID || 5} />
      {chainFromID && tokenName && (
        <SwapForm
          chainId={chainFromID}
          balance={balance}
          tokenName={tokenName}
        />
      )}
    </div>
  );
};
// TOKEN_ETH_ADDRESS='0xf121DaF9eDdF06F3f7DD56952F6BFd000BFffA61'
// TOKEN_BSC_ADDRESS='0x11E47a0465D3933E372fD4A2854e897934Fd14d7'
// TOKEN_MATIC_ADDRESS='0xD46B25771dbcd034772D0f2C5dECE94Cd3684435'

// BRIDGE_ETH_ADDRESS='0xA097413a69B55fe1aB8D6F0a4612CdAaA21dc725'
// BRIDGE_MATIC_ADDRESS='0xa2D60f2A08fF806446b971b19bAa71677c47a415'
// BRIDGE_BSC_ADDRESS='0xE88702C4B257f30a5929329191ae58A011f35172'
