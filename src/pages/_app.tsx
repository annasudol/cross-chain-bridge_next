import { ChakraProvider } from '@chakra-ui/react';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { AppProps } from 'next/app';

import '@/styles/globals.css';

// import '@/styles/colors.css';
// import CustomWeb3Provider from '@/components/CustomWeb3Provider';

function MyApp({ Component, pageProps }: AppProps) {
  return (

      <ThirdwebProvider  activeChain="goerli">
      {/* <CustomWeb3Provider> */}
            <ChakraProvider>
        <Component {...pageProps} />
        </ChakraProvider>
      {/* </CustomWeb3Provider> */}
      </ThirdwebProvider>

  );
}

export default MyApp;
