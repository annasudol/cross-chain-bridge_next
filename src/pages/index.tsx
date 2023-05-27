import * as React from 'react';

import ConnectWallet from '@/components/connectWallet';
import Seo from '@/components/Seo';
import { Tabs } from '@/components/tabs';

import { AppConfig } from '@/utils/AppConfig';


export default function HomePage() {
  return (
    <div className='home'>
      <Seo />
      <main>
        <section className=''>
          <ConnectWallet />
       <div className="flex justify-center">
  
        <Tabs />{' '}
      </div>
        </section>
      </main>
        <footer className="fixed inset-x-auto bottom-2 w-full py-4 text-sm text-white flex justify-center">
          <div className='max-w-xl text-center'>
            <p>
            © Copyright {new Date().getFullYear()} {AppConfig.title}
          </p>
          <p>
            Made by{' '}
            <a href="https://github.com/annasudol" className="text-white">
              Anna Sudol
            </a>
          </p>
          </div>
        </footer>
    </div>
  );
}
