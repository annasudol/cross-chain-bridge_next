import { ChakraProvider } from '@chakra-ui/react';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { AppProps } from 'next/app';

import '@/styles/globals.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ThirdwebProvider  activeChain="goerli">
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </ThirdwebProvider>
  );
}

export default MyApp;
