import { useAddress } from '@thirdweb-dev/react';
import * as React from 'react';

import Layout from '@/components/layout/Layout';

export default function SignInMessage() {
  const address = useAddress();
  const validator = '0x0131bB54fB52A2eF0ba27411aF3e9AC87105b2e6'
  if(validator === address)
    return (
      <Layout>
        <p>you are validator</p>
      </Layout>
    );

    return(<Layout>
        <p>you are't authorized {validator}</p>
      </Layout>)
}
