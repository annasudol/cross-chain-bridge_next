import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';

export default function NotFoundPage() {
  return (
    <Layout>
      <main className='w-full h-full'>
        <div className=' flex flex-col justify-center items-center mt-24'>
          <RiAlarmWarningFill
            size={60}
            className='drop-shadow-glow animate-flicker text-red-500'
          />
          <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
          <ArrowLink className='mt-4 md:text-lg' href='/'>
            Back to Home
          </ArrowLink>
        </div>
      </main>
    </Layout>
  );
}
