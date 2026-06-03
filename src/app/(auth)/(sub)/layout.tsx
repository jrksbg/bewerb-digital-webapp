'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  ClockIcon,
  Cog6ToothIcon, DocumentCheckIcon,
  DocumentMagnifyingGlassIcon, DocumentTextIcon, FlagIcon,
  HomeIcon, QrCodeIcon, UserGroupIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import BewerbDigitalLogo from '@/static_content/images/jrk_bewerb_digital.svg'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavbarUser from '@/app/(auth)/(sub)/NavbarUser.component';
import NoSSR from '@/utils/NoSSR';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, disabled: true },
  { name: 'Personen', href: '/personen', icon: UsersIcon, disabled: false },
  { name: 'Gruppen', href: '/gruppen', icon: UserGroupIcon, disabled: false },
  { name: 'Fragenkataloge', href: '/questionCatalogs', icon: DocumentTextIcon, disabled: false },
  { name: 'Praxisstationen', href: '/praxisstationen', icon: DocumentTextIcon, disabled: false },
  { name: 'Stationen', href: '/stationen', icon: FlagIcon, disabled: false },
  { name: 'Zeitplan', href: '/zeitplan', icon: ClockIcon, disabled: true },
  { name: 'Bewertungen', href: '/results', icon: DocumentCheckIcon, disabled: false },
  { name: 'Einsprüche', href: '/einsprueche', icon: DocumentMagnifyingGlassIcon, disabled: true },
  { name: 'Tablet QR Code', href: '/tabletQR', icon: QrCodeIcon, disabled: false },
  //{ name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
  //{ name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function DashboardLayout({
                                          children,
                                        }: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathName = usePathname()

  return (
    <div>
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center">
                <Image
                  alt="Bewerb Digital"
                  src={BewerbDigitalLogo}
                  className="h-8 w-20"
                  width={80}
                  height={32}
                />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.disabled ? '#' : item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={classNames(
                              pathName.startsWith(item.href)
                                ? 'bg-gray-50 text-rk-red'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-rk-red',
                              'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                              item.disabled ? '!text-black/60 cursor-not-allowed opacity-40' : ''
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                pathName.startsWith(item.href) ? 'text-rk-red' : 'text-gray-400 group-hover:text-rk-red',
                                'size-6 shrink-0',
                              )}
                            />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  {
                    /*
                    <li>
                    <div className="text-xs/6 font-semibold text-gray-400">Your teams</div>
                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                      {teams.map((team) => (
                        <li key={team.name}>
                          <Link
                            href={team.href}
                            className={classNames(
                              pathName.startsWith(team.href)
                                ? 'bg-gray-50 text-rk-red'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-rk-red',
                              'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                            )}
                          >
                              <span
                                className={classNames(
                                  pathName.startsWith(team.href)
                                    ? 'border-rk-red text-rk-red'
                                    : 'border-gray-200 text-gray-400 group-hover:border-rk-red group-hover:text-rk-red',
                                  'flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                                )}
                              >
                                {team.initial}
                              </span>
                            <span className="truncate">{team.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                     */
                  }

                  <li className="mt-auto">
                    <Link
                      href="/settings"
                      onClick={() => setSidebarOpen(false)}
                      className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-red-600"
                    >
                      <Cog6ToothIcon
                        aria-hidden="true"
                        className="size-6 shrink-0 text-gray-400 group-hover:text-red-600"
                      />
                      Einstellungen
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Image
              alt="Bewerb Digital"
              src={BewerbDigitalLogo}
              className="h-8 w-20"
              width={80}
              height={32}
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.disabled ? '#' : item.href}
                        className={classNames(
                           pathName.startsWith(item.href)
                            ? 'bg-gray-50 text-rk-red'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-rk-red',
                          'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                          item.disabled ? '!text-black/60 cursor-not-allowed opacity-40' : ''
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={classNames(
                            pathName.startsWith(item.href) ? 'text-rk-red' : 'text-gray-400 group-hover:text-rk-red',
                            'size-6 shrink-0',
                          )}
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {
                /*
                <li>
                <div className="text-xs/6 font-semibold text-gray-400">Your teams</div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {teams.map((team) => (
                    <li key={team.name}>
                      <Link
                        href={team.href}
                        className={classNames(
                          pathName.startsWith(team.href)
                            ? 'bg-gray-50 text-rk-red'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-rk-red',
                          'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                        )}
                      >
                          <span
                            className={classNames(
                              pathName.startsWith(team.href)
                                ? 'border-rk-red text-rk-red'
                                : 'border-gray-200 text-gray-400 group-hover:border-rk-red group-hover:text-rk-red',
                              'flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                            )}
                          >
                            {team.initial}
                          </span>
                        <span className="truncate">{team.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
                 */
              }
              <li className="mt-auto">
                <Link
                  href="/settings"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-rk-red"
                >
                  <Cog6ToothIcon
                    aria-hidden="true"
                    className="size-6 shrink-0 text-gray-400 group-hover:text-rk-red"
                  />
                  Einstellungen
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
          <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>

          {/* Separator */}
          <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="grid flex-1 grid-cols-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button>

              {/* Separator */}
              <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

              <NoSSR>
                <NavbarUser />
              </NoSSR>
            </div>
          </div>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
