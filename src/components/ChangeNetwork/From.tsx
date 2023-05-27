import { useSwitchChain } from '@thirdweb-dev/react';

import { Select } from '@/components/Select';

import { ChainType } from '@/type/chain.type';

const chains: ChainType[] = [
  // { name: 'Polygon Mumbai', id: 80001 },
  { name: 'Ethereum Goerli', id: 5 },
  { name: 'Binance Smart Chain Testnet', id: 97 },
];
const ChangeNetworkFrom: React.FC<{ chainID: number }> = ({ chainID }) => {
  const switchChain = useSwitchChain();
  return (
    <Select
      title='From'
      items={chains}
      selectedId={chainID || 5}
      handleChange={switchChain}
    />
  );
};
export default ChangeNetworkFrom;
