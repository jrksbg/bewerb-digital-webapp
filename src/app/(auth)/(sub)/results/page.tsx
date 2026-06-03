'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { CheckIcon, ClockIcon, EllipsisVerticalIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { mapStationType } from '@/utils/mapping.utils';
import { StationType } from '@/utils/enums';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function ResultsPage() {
  const [ results, setResults ] = useState([])

  const fetchData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/results`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${Cookies.get('session-token')}`,
      }
    })
      .then(response => response.json())
      .catch((err => console.log(err)))

    if (!response.statusCode) {
      setResults(response)
    }

    console.log(results)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <h1>Ergebnisse</h1>
      <div className="space-y-6">
        {
          results.map((result: any) => (
            <div key={result.gruppe.id} className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm">
              <div className="px-4 py-5 sm:px-6">
                {result.gruppe.id} - {result.gruppe.name}
              </div>
              <div className="px-4 py-5 sm:p-6">

                <ul role="list" className="divide-y divide-gray-100">
                  {result.results.map((result: any) => (
                    <li key={`${result.station.id}-${result.gruppe.id}`} className="flex justify-between gap-x-6 py-5">
                      <div className="flex min-w-0 gap-x-4">
                        {
                          result.einspruch
                            ? (
                              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-100">
                                <ExclamationCircleIcon aria-hidden="true" className="size-6 text-red-600" />
                              </div>
                            )
                            : result.abgeschlossen || result.allQuestionnairesSubmitted
                              ? (
                                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                                  <CheckIcon aria-hidden="true" className="size-6 text-green-600" />
                                </div>
                              )
                              : (
                                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-orange-100">
                                  <ClockIcon aria-hidden="true" className="size-6 text-orange-600" />
                                </div>
                              )
                        }
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm/6 font-semibold text-gray-900">
                            <a href={result.href} className="hover:underline">
                              {result.station.name}
                            </a>
                          </p>
                          <p className="mt-1 flex text-xs/5 text-gray-500">
                            {result.station.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-x-6">
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm/6 text-gray-900">{mapStationType(result.station.type)}</p>
                          {result.abgeschlossen || result.allQuestionnairesSubmitted ? (
                            <div className="mt-1 flex items-center gap-x-1.5">
                              <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                <div className="size-1.5 rounded-full bg-emerald-500" />
                              </div>
                              <p className="text-xs/5 text-gray-500">Abgeschlossen</p>
                            </div>
                          ) : (
                            <div className="mt-1 flex items-center gap-x-1.5">
                              <div className="flex-none rounded-full bg-orange-500/20 p-1">
                                <div className="size-1.5 rounded-full bg-orange-500" />
                              </div>
                              <p className="text-xs/5 text-gray-500">Bewertung offen</p>
                            </div>
                          )}
                        </div>
                        <Menu as="div" className="relative flex-none">
                          <MenuButton className="relative block text-gray-500 hover:text-gray-900">
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Open options</span>
                            <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
                          </MenuButton>
                          <MenuItems
                            transition
                            anchor="bottom end"
                            className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                          >
                            {
                              result.station.type === StationType.PRACTICAL
                                ? (
                                  <>
                                    <MenuItem disabled={!result.abgeschlossen}>
                                      <a
                                        href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/results/praxis/stationen/${result.station.id}/gruppen/${result.gruppe.id}/xlsx`}
                                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                                        target="_blank"
                                      >
                                        Excel Download
                                      </a>
                                    </MenuItem>
                                    <MenuItem disabled={!result.abgeschlossen && !result.allQuestionnairesSubmitted}>
                                      <a
                                        href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/results/praxis/stationen/${result.station.id}/gruppen/${result.gruppe.id}/pdf`}
                                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                                        target="_blank"
                                      >
                                        PDF Download
                                      </a>
                                    </MenuItem>
                                  </>
                                )
                                : (
                                  <>
                                    <MenuItem disabled={!result.allQuestionnairesSubmitted && !result.abgeschlossen}>
                                      <a
                                        href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/results/${result.station.type === StationType.THEORY ? 'theorie' : result.station.type === StationType.SOCIAL ? 'sozial' : 'zivil'}/stationen/${result.station.id}/gruppen/${result.gruppe.id}/pdf`}
                                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                                        target="_blank"
                                      >
                                        PDF Download
                                      </a>
                                    </MenuItem>
                                  </>
                                )
                            }

                          </MenuItems>
                        </Menu>
                      </div>
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
