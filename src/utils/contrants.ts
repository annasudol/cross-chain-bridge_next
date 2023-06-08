import { ITokenName } from '@/type/token.types';

export const TOKEN_SEPOLIA_ADDRESS = '0x5bd96d5DBC00e59B3d54A2AD4F0b2F822340f4A1';
export const TOKEN_MUMBAI_ADDRESS = '0x3186eaF70736995bccdC8DD6856175CA148D95CE';

export const BRIDGE_MUMBAI_ADDRESS = '0xBf4343288301eAc83D7e03414E72389F356ae061';
export const BRIDGE_SEPOLIA_ADDRESS =
  '0x11E47a0465D3933E372fD4A2854e897934Fd14d7';

export const token_address = (id: number): string => {
  const address: { [id: number]: string } = {
    11155111: TOKEN_SEPOLIA_ADDRESS,
    80001: TOKEN_MUMBAI_ADDRESS,
  };
  return id ? address[id] : '';
};

export const bridge_address = (id: number): string => {
  const address: { [_id: number]: string } = {
    11155111: BRIDGE_SEPOLIA_ADDRESS,
    80001: BRIDGE_MUMBAI_ADDRESS,
  };
  return address[id];
};

export const etherscan_address = (id: number, blockHash: string): string => {
  const address: { [_id: number]: string } = {
    11155111: `https://sepolia.etherscan.io/tx/${blockHash}`,
    80001: `https://mumbai.polygonscan.com/tx/${blockHash}`,
  };
  return address[id];
};
export const token_name = (id: number): ITokenName => {
  const name: { [_id: number]: string } = {
    11155111: 'eETH',
    80001: 'mETH',
  };
  return name[id] as ITokenName;
};
