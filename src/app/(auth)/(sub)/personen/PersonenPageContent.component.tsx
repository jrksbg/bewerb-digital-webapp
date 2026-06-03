'use client'

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import AddPersonButton from '@/app/(auth)/(sub)/personen/AddPersonButton.component';

export default function PersonenPageContent({ bewerbsgruppen }: { bewerbsgruppen: any }) {
  const [ personen, setPersonen ] = useState([])
  const [ fetchingPersonen, setFetchingPersonen ] = useState(false)

  const fetchPersonen = async () => {
    setFetchingPersonen(true)
    const personen = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/personen`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${Cookies.get('session-token')}`,
      }
    }).then(response => response.json())
    setPersonen(personen)
    setFetchingPersonen(false)
  }

  useEffect(() => {
    fetchPersonen()
  }, [])

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Personen</h1>
          <p className="mt-2 text-sm text-gray-700">
            Alle Personen und Teilnehmer:innen des JRK Camps.
          </p>
        </div>
        <AddPersonButton fetchPersonen={fetchPersonen} bewerbsgruppen={bewerbsgruppen} />
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
                  Personalnummer
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Bewerbsgruppe
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
                fetchingPersonen
                  ? (
                    <tr>
                      <td colSpan={4} className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8">
                        Lade Teilnehehmer:innen
                      </td>
                    </tr>
                  )
                  : !fetchingPersonen && personen.length === 0
                    ? (
                      <tr>
                        <td colSpan={4} className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8">
                          Keine Teilnehmer:innen angelegt
                        </td>
                      </tr>
                    )
                    : (
                      personen.map((person: any) => (
                        <tr key={person.pernr}>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8">
                            {person.pernr?.toString().padStart(5, '0')}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{person.name}</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{person.bewerbsteam?.name}</td>
                          {
                            /*
                            <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6 lg:pr-8">
                            <a href="#" className="text-rk-red-600 hover:text-rk-red-900">
                              Edit<span className="sr-only">, {person.name}</span>
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