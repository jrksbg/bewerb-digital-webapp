'use client'

import { getSessionData } from '@/utils/auth.utils';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

const userNavigation = [
  { name: 'Abmelden', href: '/logout' },
]

export default function NavbarUser() {
  const user = getSessionData()

  return (
    <Menu as="div" className="relative">
    <MenuButton className="-m-1.5 flex items-center p-1.5">
      <span className="sr-only">Open user menu</span>
      <img
        alt=""
        src="/user_placeholder.svg"
        className="size-8 rounded-full bg-gray-50"
      />
      <span className="hidden lg:flex lg:items-center">
                      <span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-gray-900">
                        {user?.vorname}
                      </span>
                      <ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-gray-400" />
                    </span>
    </MenuButton>
    <MenuItems
      transition
      className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 ring-1 shadow-lg ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
    >
      {userNavigation.map((item) => (
        <MenuItem key={item.name}>
          <Link
            href={item.href}
            className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
          >
            {item.name}
          </Link>
        </MenuItem>
      ))}
    </MenuItems>
  </Menu>
  )
}

