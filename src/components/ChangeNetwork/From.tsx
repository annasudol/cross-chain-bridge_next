import { useSwitchChain } from '@thirdweb-dev/react';

import { Select } from '@/components/Select';

import { ChainType } from '@/type/chain.type';

const chains: ChainType[] = [
  { name: 'Ethereum Sepolia', id: 11155111},
  { name: 'Polygon Mumbai', id: 80001 },
];
const ChangeNetworkFrom: React.FC<{ chainID: number }> = ({ chainID }) => {
  const switchChain = useSwitchChain();
  return (
    <Select
      title='From'
      items={chains}
      chainID={chainID}
      handleChange={switchChain}
    />
  );
};
export default ChangeNetworkFrom;
