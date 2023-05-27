import { Chain } from '@thirdweb-dev/chains';
import { ThirdwebSDKProvider } from '@thirdweb-dev/react';
import gas from '@web3-onboard/gas';
import gnosisModule from '@web3-onboard/gnosis';
import injectedModule from '@web3-onboard/injected-wallets';
import { init } from '@web3-onboard/react';
import React, { PropsWithChildren, useState } from 'react';
type ParsedChain = {
  id: number;
  label: string;
  token: string;
  rpcUrl: string;
  blockExplorerUrl: string | undefined;
};
const chains: ParsedChain[] = [
  {
    blockExplorerUrl: 'https://mumbai.polygonscan.com',
    id: 80001,
    label: 'Mumbai',
    rpcUrl: 'https://mumbai.rpc.thirdweb.com/${THIRDWEB_API_KEY}',
    token: 'MATIC',
  },
  {
    blockExplorerUrl: 'https://goerli.etherscan.io',
    id: 5,
    label: 'Goerli',
    rpcUrl: 'https://goerli.rpc.thirdweb.com/${THIRDWEB_API_KEY}',
    token: 'ETH',
  },
  {
    blockExplorerUrl: 'https://testnet.bscscan.com',
    id: 97,
    label: 'Binance Smart Chain Testnet',
    rpcUrl: 'https://binance-testnet.rpc.thirdweb.com/${THIRDWEB_API_KEY}',
    token: 'tBNB',
  },
];

const injected = injectedModule();

const gnosis = gnosisModule();

// const wchains: ParsedChain[] = defaultChains.map((chain: Chain) => ({
//   id: chain.chainId,
//   label: chain.name,
//   token: chain.nativeCurrency.symbol,
//   rpcUrl: chain.rpc[0],
//   blockExplorerUrl: chain.explorers?.find(() => true)?.url,
// }));

// console.log(wchains, 'wchains');

export const parsedChains = JSON.parse(JSON.stringify(chains));

init({
  wallets: [injected, gnosis],
  chains: parsedChains,
  appMetadata: {
    name: 'Cross Bridge',
    icon: '<svg>Cross Bridge</svg>',
    description: 'Cross Bridge',
    recommendedInjectedWallets: [
      { name: 'MetaMask', url: 'https://metamask.io' },
    ],
    /*
    agreement: {
      version: "1.0.0",
      termsUrl: "https://www.blocknative.com/terms-conditions",
      privacyUrl: "https://www.blocknative.com/privacy-policy",
    },
    gettingStartedGuide: "https://blocknative.com",
    explore: "https://blocknative.com",
	*/
  },
  accountCenter: {
    mobile: {
      enabled: false,
    },
    desktop: {
      position: 'topRight',
      enabled: false,
      minimal: false,
    },
  },
});

// subscribe to a single chain for estimates using the default poll rate of 5 secs
// API key is optional and if provided allows for faster poll rates
export const ethMainnetGasBlockPrices = gas.stream({
  chains: ['0x1'],
  // apiKey: dappId,
  endpoint: 'blockPrices',
});

/**
 * A provider that can be used to wrap a component tree and provide to lower level components a mechanism
 * for retrieving and setting the current blockchain provider
 */
const CustomWeb3Provider: React.FC<PropsWithChildren> = (props) => {
  const [chain, setChain] = useState<Chain | undefined>(undefined);
  const [infuraApiKey, setInfuraApiKey] = useState<string | undefined>(
    undefined
  );
  const [alchemyApiKey, setAlchemyApiKey] = useState<string | undefined>(
    undefined
  );
  const [thirdwebApiKey, setThirdwebApiKey] = useState<string | undefined>(
    undefined
  );
  const [customEndpoint, setCustomEndpoint] = useState<string | undefined>(
    undefined
  );

  // const ethersProvider: ethers.providers.Web3Provider =
  //   ethers.getDefaultProvider() as ethers.providers.Web3Provider;
  let etherSigner;

  // if (wallet) {
  //   ethersProvider = new ethers.providers.Web3Provider(wallet.provider, "any");
  //   etherSigner = ethersProvider.getSigner();
  // }

  return (
    <ThirdwebSDKProvider
      signer={etherSigner}
      {...((infuraApiKey || alchemyApiKey) && { thirdwebApiKey: '' })}
      {...(thirdwebApiKey && { thirdwebApiKey: thirdwebApiKey })}
      {...(infuraApiKey && { infuraApiKey: infuraApiKey })}
      {...(alchemyApiKey && { alchemyApiKey: alchemyApiKey })}
    >
      {props.children}
    </ThirdwebSDKProvider>
  );
};

export default CustomWeb3Provider;
