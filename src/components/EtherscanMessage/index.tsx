import { Link, Text } from '@chakra-ui/react';
import { useChainId } from '@thirdweb-dev/react';

import { etherscan_address } from '@/utils/contrants';

interface EtherScanMessageProps {
  title: string;
  blockHash: string;
}
export const EtherScanMessage: React.FC<EtherScanMessageProps> = ({
  title,
  blockHash,
}) => {
  const chain = useChainId();

  return (
    <>
      <Text>{title}</Text>
      <Text>
        <Link href={etherscan_address(chain || 5, blockHash)} isExternal>
          View on Etherscan
        </Link>
      </Text>
    </>
  );
};
