import { Tab } from '@headlessui/react';
import clsx from 'clsx';

import { Bridge } from '@/components/Bridge';
import { Redeem } from '@/components/Redeem';

export const Tabs = () => {
  const categories = ['Swap', 'Redeem'];
  return (
    <div className='mt-16 w-full max-w-xl py-16 sm:px-0'>
      <Tab.Group>
        <Tab.List className='flex space-x-1 rounded-xl bg-blue-900/20 p-1'>
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                clsx(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  selected ? 'bg-blue-900 shadow text-white' : 'text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='mt-2'>
          {categories.map((_cat, idx) => (
            <Tab.Panel
              key={idx}
              className='rounded-xl bg-blue-900 p-3 h-80 focus:outline-none'
            >
              {idx === 1 ? <Redeem /> : <Bridge />}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
