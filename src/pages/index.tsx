import * as React from 'react';

import { Bridge } from '@/components/Bridge';
import ConnectWallet from '@/components/connectWallet';
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';


export default function HomePage() {
  return (
    <Layout>
      <Seo />

      <main>
        <section className='bg-white'>
                    <ConnectWallet />
<Bridge/>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          </div>
        </section>
      </main>
    </Layout>
  );
}
