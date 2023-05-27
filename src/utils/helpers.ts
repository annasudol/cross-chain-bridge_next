export const truncateEthAddress = (address: string, maxLength = 6) =>
  `${address.slice(0, maxLength)}...${address.slice(-4)}`;
