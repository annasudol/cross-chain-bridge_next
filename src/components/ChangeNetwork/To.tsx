import { Select } from '@/components/Select';

import { ChainType } from '@/type/chain.type';

const chains: ChainType[] = [
  { name: 'Polygon Mumbai', id: 80001 },
  { name: 'Ethereum Goerli', id: 5 },
  { name: 'Binance Smart Chain Testnet', id: 97 },
];
const ChangeNetworkTo: React.FC<{
  chainID: number;
  handleChange: (chain: number) => void;
}> = ({ chainID, handleChange }) => {
  return (
    <Select
      title='To'
      items={chainID ? chains.filter((chain) => chain.id !== chainID) : chains}
      chainID={chainID}
      handleChange={handleChange}
    />
  );
};
export default ChangeNetworkTo;
