'use client';

import { Label, Switch } from '@headlessui/react';
import { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Field, FieldArray, Form, Formik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function NewQuestionPage() {
  const [enabled, setEnabled] = useState(false)
  const router = useRouter()
  const { questionCatalogId } = useParams()

  return (
    <Formik
      initialValues={{
        text: '',
        answers: [{
          text: '',
          correctAnswer: false,
        }],
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true)
        const question = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/questionCatalogs/${questionCatalogId}/questions`, {
          method: 'POST',
          body: JSON.stringify({
            text: values.text,
            answers: values.answers,
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${Cookies.get('session-token')}`,
          }
        }).then(response => response.json())
        setSubmitting(false)
        router.replace(`/questionCatalogs/${questionCatalogId}`)
      }}
    >
      {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          /* and other goodies */
        }) => (
        <Form>
          <div>
            <label
              htmlFor="frage"
              className="block text-base font-semibold text-gray-900"
            >
              Frage
            </label>
            <div className="mt-2">
              <Field
                as="textarea"
                id="text"
                name="text"
                type="text"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
              />
            </div>
          </div>

          <div className="mt-6">
            <FieldArray
              name="answers"
              render={(arrayHelpers) => (
                <>
                  <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                      <h1 className="text-base font-semibold text-gray-900">Antworten</h1>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                      <button
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            correctAnswer: false,
                            text: '',
                          })
                        }
                        className="inline-flex items-center gap-x-1.5  rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      >
                        <PlusIcon aria-hidden="true" className="-ml-0.5 size-5" />
                        Antwort hinzufügen
                      </button>
                    </div>
                  </div>

                  {
                    values.answers && values.answers.length > 0
                      ? (
                        <div className="overflow-hidden rounded-md border border-gray-300 bg-white mt-3">
                          <ul role="list" className="divide-y divide-gray-300">
                            {
                              values.answers.map((answer, index) => (
                                <li key={index} className="px-6 py-4 gap-y-3">
                                  <div className="flex place-content-between">
                                    <div className="flex items-center">
                                      <Switch
                                        checked={answer.correctAnswer}
                                        onChange={setFieldValue.bind(
                                          null,
                                          `answers[${index}].correctAnswer`,
                                          !answer.correctAnswer,
                                        )}
                                        className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-red-600 transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-hidden data-checked:bg-green-600"
                                      >
                                  <span className="pointer-events-none relative inline-block size-5 transform rounded-full bg-white ring-0 shadow-sm transition duration-200 ease-in-out group-data-checked:translate-x-5">
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0 flex size-full items-center justify-center transition-opacity duration-200 ease-in group-data-checked:opacity-0 group-data-checked:duration-100 group-data-checked:ease-out"
                                    >
                                      <svg
                                        fill="none"
                                        viewBox="0 0 12 12"
                                        className="size-3 text-red-600"
                                      >
                                        <path
                                          d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                          stroke="currentColor"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </span>
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0 flex size-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out group-data-checked:opacity-100 group-data-checked:duration-200 group-data-checked:ease-in"
                                    >
                                      <svg
                                        fill="currentColor"
                                        viewBox="0 0 12 12"
                                        className="size-3 text-green-600"
                                      >
                                        <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                      </svg>
                                    </span>
                                  </span>
                                      </Switch>
                                      <span className="ml-3 text-sm">
                                  <span className="font-medium text-gray-900">
                                    {answer.correctAnswer
                                      ? 'richtige Antwort'
                                      : 'falsche Antwort'}
                                  </span>
                                </span>
                                    </div>
                                    <button
                                      type="button"
                                      className="rounded-sm bg-white px-2 py-1 text-xs font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <TrashIcon className="size-6" />
                                    </button>
                                  </div>

                                  <div>
                                    <div className="mt-2">
                                      <Field
                                        id={`answer-text-${index}`}
                                        name={`answers.${index}.text`}
                                        type="text"
                                        placeholder="Antwort"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                                      />
                                    </div>
                                  </div>
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      )
                      : null
                  }
                </>
              )}
            />
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-sm/6 font-semibold text-gray-900"
            >
              Abbrechen
            </button>


            <button
              type="submit"
              disabled={isSubmitting}
              className="block rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-rk-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rk-red-600"
            >
              Speichern
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
