import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

import { ChainType } from '@/type/chain.type';

interface SelectProps {
  selectedId: number;
  items: ChainType[];
  handleChange: (chain: number) => void;
  title: string;
}
export const Select: React.FC<SelectProps> = ({
  title,
  selectedId,
  items,
  handleChange,
}) => {
  return (
    <>
      <div className='w-44 mb-4'>
        <Listbox value={selectedId} onChange={(value) => handleChange(value)}>
          <div className='relative mt-1 flex items-center'>
            <span className='text-white mr-2'>{title} </span>{' '}
            <Listbox.Button className='inline-flex items-center rounded-full border border-transparent bg-indigo-700 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-2'>
              <span className='block truncate'>
                {items.filter((item) => item.id === selectedId)[0]?.name}
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute mt-1 max-h-60 w-22 z-50 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {items.map((chain) => (
                  <Listbox.Option
                    key={chain.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? 'bg-green-100  text-indigo-800'
                          : 'text-gray-900'
                      }`
                    }
                    value={chain.id}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {chain.name}
                        </span>
                        {selected ? (
                          <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-800'>
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </>
  );
};
