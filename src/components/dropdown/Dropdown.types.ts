import { ReactNode } from 'react';

export type DropdownItem = {
  icon?: ReactNode;
  disabled?: boolean;
  text: string;
  onClick: () => void;
};

export type DropdownProps = {
  disabled?: boolean;
  label?: string;
  items: DropdownItem[];
  classes?: string;
};
