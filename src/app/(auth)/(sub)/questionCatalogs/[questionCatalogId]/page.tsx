'use server'

import Link from 'next/link';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { cookies } from 'next/headers';

export default async function EditQuestionCatalog({ params } : { params: any } ) {
  const cookieStore = await cookies()

  const questionCatalog = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/questionCatalogs/${params.questionCatalogId}?includeQuestions=true`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${cookieStore.get('session-token')?.value}`,
    },
  }).then(response => response.json())

  return (
    <div>
      <header className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {questionCatalog.name}
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            type="button"
            href={`/questionCatalogs/${questionCatalog.id}/newQuestion`}
            className="ml-3 inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Frage hinzufügen
          </Link>
        </div>
      </header>

      <div className="h-screen w-full pt-16 px-4">
        <div className="overflow-hidden rounded-md border border-gray-300 bg-white mt-3">
          <div className="w-full divide-y divide-gray-300">
            {
              questionCatalog.questions.map((question: any) => (
                <Disclosure key={question.id} as="div" className="p-6">
                  <DisclosureButton className="group flex w-full items-center justify-between">
                    <span className="text-lg font-semibold group-data-[hover]:text-black/80">
                      {question.text}
                    </span>
                    <ChevronDownIcon className="size-5 fill-black group-data-[hover]:fill-black/50 group-data-[open]:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 text-sm/5">
                    <div className="flex justify-end gap-x-2">
                      <Link
                        type="button"
                        href={`/questions/${question.id}/edit`}
                        className="block rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-rk-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rk-red-600"
                      >
                        <PencilIcon className="size-4" />
                      </Link>
                    </div>
                    <div className="mt-4">
                      {
                        question.answers.map((answer: any, index: number) => (
                          <div key={answer.id}>
                            <b>Antwort { index + 1 }:</b>{' '}
                            <span className={answer.correctAnswer ? 'text-green-600' : 'text-red-600'}>
                              {answer.text}
                            </span>
                          </div>
                        ))
                      }
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))
            }
          </div>
        </div>
      </div>

    </div>
  )
}
