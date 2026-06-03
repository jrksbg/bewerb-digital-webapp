'use client'

import AddGroupButton from '@/app/(auth)/(sub)/gruppen/AddGroupButton.component';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { mapAltersklasse } from '@/utils/mapping.utils';

export default function GruppenPage() {
  const [ gruppen, setGruppen ] = useState([])
  const [ fetchingGruppen, setFetchingGruppen ] = useState(false)

  const fetchGruppen = async () => {
    setFetchingGruppen(true)
    const gruppen = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/gruppen`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${Cookies.get('session-token')}`,
      }
    }).then(response => response.json())
    setGruppen(gruppen)
    setFetchingGruppen(false)
  }

  useEffect(() => {
    fetchGruppen()
  }, [])


  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Gruppen</h1>
          <p className="mt-2 text-sm text-gray-700">
            Alle Gruppen des JRK Camps.
          </p>
        </div>
        <AddGroupButton fetchGruppen={fetchGruppen} />
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                >
                  Gruppenname
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Jugendgruppe
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Altersklasse
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Eingemeldete Teilnehmende
                </th>
                {
                  /*
                  <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-6 lg:pr-8">
                  <span className="sr-only">Edit</span>
                </th>
                   */
                }
              </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
              {
                fetchingGruppen
                  ? (
                    <tr>
                      <td colSpan={4} className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8">
                        Lade Gruppen
                      </td>
                    </tr>
                  )
                  : !fetchingGruppen && gruppen.length === 0
                    ? (
                      <tr>
                        <td colSpan={4} className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8">
                          Keine Gruppen angelegt
                        </td>
                      </tr>
                    )
                    : (
                      gruppen.map((gruppe: any) => (
                        <tr key={gruppe.id}>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8">
                            {gruppe.name}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{gruppe.jugendgruppe}</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{mapAltersklasse(gruppe.altersklasse)}</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{gruppe._count.teilnehmer}</td>
                          {
                            /*
                            <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6 lg:pr-8">
                            <a href="#" className="text-rk-red-600 hover:text-rk-red-900">
                              Edit<span className="sr-only">, {gruppe.name}</span>
                            </a>
                          </td>
                             */
                          }

                        </tr>
                      ))
                    )
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}