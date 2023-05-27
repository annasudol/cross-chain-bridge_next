import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app';

import '@/styles/globals.css';

// import '@/styles/colors.css';
import CustomWeb3Provider from "@/components/CustomWeb3Provider";


function MyApp({ Component, pageProps }: AppProps) {
  return  <ChakraProvider><CustomWeb3Provider><Component {...pageProps} /></CustomWeb3Provider></ChakraProvider>;
}

export default MyApp;
