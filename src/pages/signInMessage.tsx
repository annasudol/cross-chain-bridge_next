import { useAddress } from '@thirdweb-dev/react';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';

export default function SignInMessage() {
  const address = useAddress();
  const validator = '0x0131bB54fB52A2eF0ba27411aF3e9AC87105b2e6';
  if (validator === address)
    return (
      <Layout>
        <div className='rounded-xl bg-blue-900 p-3 h-96 text-white w-96 mt-8'>
          <p>you are validator</p>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className='rounded-xl bg-blue-900 p-3 h-96 text-white w-96 mt-8 flex justify-center items-center'>
        <div>
          <p>you are't authorized to validate messages</p>
          <ArrowLink className='mt-4 md:text-lg' href='/'>
            Back to Home
          </ArrowLink>
        </div>
      </div>
    </Layout>
  );
}
