import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import type { FC } from "react";
import { Fragment } from "react";

import type { DropdownProps } from "./Dropdown.types";


const Dropdown: FC<DropdownProps> = ({
  label,
  disabled,
  items,
  classes = "inline-flex w-full justify-center md px-4 py-2",
}) => {


  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button
        disabled={disabled}
        aria-disabled={disabled}
        className={clsx(
          "text-sm font-medium text-left whitespace-nowrap bg-light-blue-100 text-slate-900 rounded-md disabled:opacity-50",
          classes
        )}
      >
        {({ open }) => (
          <>
            {label}
            <ChevronDownIcon
              className={clsx(
                "-mr-1 ml-2 h-5 w-5 transition text-white",
                {
                  "rotate-180": open,
                }
              )}
              aria-hidden="true"
            />
          </>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute right-0 z-10 mt-2 min-w-full max-w-52 origin-top focus:outline-none bg-white shadow-sm rounded-md border-1"
        >
          <div className="py-1">
            {items.map(({ icon, text, onClick, disabled: itemDisabled }) => (
              <Menu.Item key={text}>
                {({ active }) => (
                  <button
                    disabled={itemDisabled}
                    aria-disabled={itemDisabled}
                    onClick={onClick}
                    className={clsx(
                      "text-left flex gap-2 px-4 py-2 text-sm w-full items-center disabled:opacity-50 disabled:cursor-not-allowed",
                      {
                        "text-blue-gray-900": active,
                        "text-slate-900": !active,
                      }
                    )}
                  >
                    {icon && <div className="shrink-0">{icon}</div>}
                    <div className="truncate block">{text}</div>
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
