import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useChainId,useSwitchChain } from "@thirdweb-dev/react";
import { Fragment } from 'react'

const chains = [
  { name: 'Polygon Mumbai', id: 80001,},
  { name: 'Ethereum Goerli',  id: 5, },
  { name: 'Binance Smart Chain Testnet', id: 97 },
]
export default function ChangeNetwork() {
  const chain = useChainId();

const switchChain = useSwitchChain();



  return (
    <div className="w-44 mb-4">
      <Listbox value={chain} onChange={(value)=> switchChain(value || 5)}>
        <div className="relative mt-1 flex items-center">
          <span className="text-white mr-2">From </span> <Listbox.Button className="inline-flex items-center rounded-full border border-transparent bg-indigo-700 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-2">
            <span className="block truncate">{chains.filter(item=> item.id ===chain)[0]?.name}</span>
    
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-22 z-50 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {chains.map(chain => (
                <Listbox.Option
                  key={chain.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-green-100  text-indigo-800' : 'text-gray-900'
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
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-800">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
  )
}