import { BigNumber, utils } from 'ethers';
export const formatBigNumber = (value: BigNumber) => {
  const big_num_val = BigNumber.from(value);
  return utils.formatEther(big_num_val);
};
