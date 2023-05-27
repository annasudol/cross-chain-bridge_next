import { Chain, defaultChains } from "@thirdweb-dev/chains";
import { ThirdwebSDKProvider } from "@thirdweb-dev/react";
import coinbaseModule from "@web3-onboard/coinbase";
import fortmaticModule from "@web3-onboard/fortmatic";
import gas from "@web3-onboard/gas";
import gnosisModule from "@web3-onboard/gnosis";
import injectedModule from "@web3-onboard/injected-wallets";
import keepkeyModule from "@web3-onboard/keepkey";
import ledgerModule from "@web3-onboard/ledger";
import portisModule from "@web3-onboard/portis";
import { init } from "@web3-onboard/react";
import sequenceModule from "@web3-onboard/sequence";
import tallyModule from "@web3-onboard/tallyho";
import torusModule from "@web3-onboard/torus";
import trezorModule from "@web3-onboard/trezor";
import walletConnectModule from "@web3-onboard/walletconnect";
import React, { PropsWithChildren, useState } from "react";

type ParsedChain = {
  id: number;
  label: string;
  token: string;
  rpcUrl: string;
  blockExplorerUrl: string | undefined;
};

//const MAGIC_ID = env.magicKey;
//const dappId = "d3ba5afd-f4d8-4392-8d7e-0c4dd8d92460";

const injected = injectedModule();
const coinbase = coinbaseModule();
const walletConnect = walletConnectModule();

const portis = portisModule({
  apiKey: "b2b7586f-2b1e-4c30-a7fb-c2d1533b153b",
});

const fortmatic = fortmaticModule({
  apiKey: "pk_test_886ADCAB855632AA",
});

const torus = torusModule();
const ledger = ledgerModule();
const keepkey = keepkeyModule();
const gnosis = gnosisModule();
const sequence = sequenceModule();
const tally = tallyModule();

const trezorOptions = {
  email: "test@test.com",
  appUrl: "https://www.blocknative.com",
};

const wchains: ParsedChain[] = defaultChains.map((chain: Chain) => ({
  id: chain.chainId,
  label: chain.name,
  token: chain.nativeCurrency.symbol,
  rpcUrl: chain.rpc[0],
  blockExplorerUrl: chain.explorers?.find(() => true)?.url,
}));

export const parsedChains = JSON.parse(JSON.stringify(wchains));

const trezor = trezorModule(trezorOptions);

init({
  wallets: [
    injected,
    tally,
    ledger,
    coinbase,
    trezor,
    walletConnect,
    gnosis,
    fortmatic,
    keepkey,
    portis,
    torus,
    sequence,
  ],
  chains: parsedChains,
  appMetadata: {
    name: "NFT Governor",
    icon: "<svg>NFT Governor</svg>",
    description: "NFT Governor",
    recommendedInjectedWallets: [
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
      { name: "MetaMask", url: "https://metamask.io" },
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
      position: "topRight",
      enabled: false,
      minimal: false,
    },
  },
});

// subscribe to a single chain for estimates using the default poll rate of 5 secs
// API key is optional and if provided allows for faster poll rates
export const ethMainnetGasBlockPrices = gas.stream({
  chains: ["0x1"],
  // apiKey: dappId,
  endpoint: "blockPrices",
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

return(
    <ThirdwebSDKProvider
      signer={etherSigner}

      {...((infuraApiKey || alchemyApiKey) && { thirdwebApiKey: "" })}
      {...(thirdwebApiKey && { thirdwebApiKey: thirdwebApiKey })}
      {...(infuraApiKey && { infuraApiKey: infuraApiKey })}
      {...(alchemyApiKey && { alchemyApiKey: alchemyApiKey })}
    >
      {props.children}
    </ThirdwebSDKProvider>
  );
};

export default CustomWeb3Provider;
