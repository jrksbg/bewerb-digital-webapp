'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function ZeitplanPage() {
  const [ open, setOpen ] = useState(false)
  const [ questionCatalogs, setQuestionCatalogs ] = useState([])
  const [ loadingQuestionCatalogs, setLoadingQuestionCatalogs ] = useState(false)
  const [ newQuestionCatalogName, setNewQuestionCatalogName ] = useState('')

  const loadCatalogs = async () => {
    setLoadingQuestionCatalogs(true)
    const catalogs = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/questionCatalogs`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${Cookies.get('session-token')}`,
      }
    }).then(response => response.json())
    setQuestionCatalogs(catalogs)
    setLoadingQuestionCatalogs(false)
  }

  useEffect(() => {
    loadCatalogs()
  }, []);

  const openNewQuestionCatalogDialog = () => {
    setNewQuestionCatalogName('')
    setOpen(true)
  }

  const createNewCatalog = async () => {
    const newCatalog = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/questionCatalogs`, {
      method: 'POST',
      body: JSON.stringify({
        name: newQuestionCatalogName,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${Cookies.get('session-token')}`,
      }
    }).then(response => response.json())
    console.log(newCatalog)
    loadCatalogs()
    setOpen(false)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Fragenkataloge</h1>
          <p className="mt-2 text-sm text-gray-700">
            Fragenkataloge für die Theoriestationen
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={openNewQuestionCatalogDialog}
            className="block rounded-md bg-rk-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-rk-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rk-red-600"
          >
            Fragenkatalog anlegen
          </button>
        </div>
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
                  Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Anzahl Fragen
                </th>
                <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-6 lg:pr-8">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
              {questionCatalogs.map((questionCatalog: any) => (
                <tr key={questionCatalog.id}>
                  <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8">
                    {questionCatalog.name}
                  </td>
                  <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{questionCatalog._count.questions}</td>
                  <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6 lg:pr-8">
                    <Link href={`/questionCatalogs/${questionCatalog.id}`} className="text-rk-red-600 hover:text-rk-red-900">
                      <span className="sr-only">{questionCatalog.name}{' '}</span>Anzeigen
                    </Link>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10">
                  <PlusIcon aria-hidden="true" className="size-6 text-blue-600" />
                </div>
                <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    Neuer Fragenkatalog
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Wie soll der neue Fragenkatalog heißen?
                    </p>
                  </div>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={newQuestionCatalogName}
                      onChange={(evt) => setNewQuestionCatalogName(evt.target.value)}
                      placeholder="Fragenkatalog Jugend 1"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={createNewCatalog}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Anlegen
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Abbrechen
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}