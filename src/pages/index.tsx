import { ConnectWallet } from '@thirdweb-dev/react';
import * as React from 'react';

import Seo from '@/components/Seo';
import { Tabs } from '@/components/tabs';

import { AppConfig } from '@/utils/AppConfig';

export default function HomePage() {
  return (
    <div className='w-screen h-screen overflow-hidden grad'>
      <Seo />
      <main>
        <section className='max-w-lg mx-auto p-4 z-10 relative'>
          <ConnectWallet />
          <div className='flex justify-center'>
            <Tabs />
          </div>
        </section>
      </main>
      <footer className='z-0 inset-x-auto text-sm text-white flex justify-center'>
        <div className='max-w-xl text-center'>
          <p>
            © Copyright {new Date().getFullYear()} {AppConfig.title}
          </p>
          <p>
            Made by{' '}
            <a href='https://github.com/annasudol' className='text-white'>
              Anna Sudol
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
