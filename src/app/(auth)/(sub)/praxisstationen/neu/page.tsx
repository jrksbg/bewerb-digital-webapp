'use client'

import { Field, FieldArray, Form, Formik } from 'formik';
import { StationType } from '@/utils/enums';
import Cookies from 'js-cookie';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Switch } from '@headlessui/react';
import { useRouter } from 'next/navigation';

export default function NeuePraxisstationPage() {
  const router = useRouter()

  return (
    <Formik
      initialValues={{
        name: '',
        bewerter: [{
          helfi: false,
          hauptbewerter: true,
          kriterien: [{
            text: '',
            punkte: '',
          }],
          additionalNotes: '',
        }],
        szenarioBeschreibung: '',
        masterfrage: '',
        masterfrageA1: '',
        masterfrageA2: '',
        masterfrageA3: '',
        masterfragePunkte: '',
      }}
      onSubmit={async (values, {setSubmitting}) => {
        setSubmitting(true)
        console.log(values)
        const body = {
          name: values.name,
          szenarioBeschreibung: values.szenarioBeschreibung,
          masterfrage: values.masterfrage,
          masterfrageA1: values.masterfrageA1,
          masterfrageA2: values.masterfrageA2,
          masterfrageA3: values.masterfrageA3,
          masterfragePunkte: values.masterfragePunkte,
          bewerter: values.bewerter,
        }

        const praxisstation = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/praxisstationen`, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${Cookies.get('session-token')}`,
          }
        }).then(response => response.json())
        console.log(praxisstation)
        setSubmitting(false)
        router.push(`/praxisstationen`)

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
          <div className="space-y-12">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
              <div>
                <h2 className="text-base/7 font-semibold text-gray-900">Allgemeine Informationen</h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Allgemeine Vorlagendaten
                </p>
              </div>

              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">

                <div className="col-span-full">
                  <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                    Name
                  </label>
                  <div className="mt-2">
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                    />
                  </div>
                </div>

              </div>
            </div>

            <>
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                <div>
                  <h2 className="text-base/7 font-semibold text-gray-900">Szenario</h2>
                  <p className="mt-1 text-sm/6 text-gray-600">Szenario für Praxisstationen</p>
                </div>

                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">

                  <div className="col-span-full">
                    <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                      Szenariobeschreibung
                    </label>
                    <div className="mt-2">
                      <Field
                        as="textarea"
                        id="szenarioBeschreibung"
                        name="szenarioBeschreibung"
                        rows={3}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                      />
                    </div>
                    <p className="mt-3 text-sm/6 text-gray-600">Diese Beschreibung wird vom Hauptbewerter vorgelesen.</p>
                  </div>

                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                <div>
                  <h2 className="text-base/7 font-semibold text-gray-900">Masterfrage</h2>
                  <p className="mt-1 text-sm/6 text-gray-600">Masterfrage, die durch die/den Hauptbewerter:in gestellt wird</p>
                </div>

                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">

                  <div className="col-span-full">
                    <label htmlFor="masterfrage" className="block text-sm/6 font-medium text-gray-900">
                      Masterfrage
                    </label>
                    <div className="mt-2">
                      <Field
                        as="textarea"
                        id="masterfrage"
                        name="masterfrage"
                        rows={3}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="masterfrageA1" className="block text-sm/6 font-medium text-gray-900">
                      Richtige Antwort
                    </label>
                    <div className="mt-2">
                      <Field
                        id="masterfrageA1"
                        name="masterfrageA1"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="masterfrageA2" className="block text-sm/6 font-medium text-gray-900">
                      Antwort 2
                    </label>
                    <div className="mt-2">
                      <Field
                        id="masterfrageA2"
                        name="masterfrageA2"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="masterfrageA3" className="block text-sm/6 font-medium text-gray-900">
                      Antwort 3
                    </label>
                    <div className="mt-2">
                      <Field
                        id="masterfrageA3"
                        name="masterfrageA3"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="masterfragePunkte" className="block text-sm/6 font-medium text-gray-900">
                      Punkte
                    </label>
                    <div className="mt-2">
                      <Field
                        type="number"
                        id="masterfragePunkte"
                        name="masterfragePunkte"
                        min={0}
                        step={1}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                      />
                    </div>
                  </div>

                </div>
              </div>

              <FieldArray
                name="bewerter"
                render={(arrayHelpersBewerter) => (
                  <>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                      <button
                        type="button"
                        onClick={() =>
                          arrayHelpersBewerter.push({
                            hauptbewerter: false,
                            kriterien: [{
                              text: '',
                              punkte: '',
                            }],
                            additionalNotes: '',
                          })
                        }
                        className="inline-flex items-center gap-x-1.5  rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      >
                        <PlusIcon aria-hidden="true" className="-ml-0.5 size-5"/>
                        Bewerter:in hinzufügen
                      </button>
                    </div>
                    {
                      values.bewerter.map((bewerter: any, index: number) => (
                        <div key={index} className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                          <div>
                            <h2 className="text-base/7 font-semibold text-gray-900">
                              {
                                index === 0
                                  ? 'Hauptbewerter:in'
                                  : `Bewerter:in ${index}`
                              }
                            </h2>
                            <p className="mt-1 text-sm/6 text-gray-600">
                              {
                                index === 0
                                  ? 'Szenario für Hauptbewerter:in'
                                  : `Szenario für Bewerter:in ${index}`
                              }
                            </p>

                            {
                              index > 0
                                ? (
                                  <div className="mt-10">
                                    <button
                                      type="button"
                                      className="rounded-sm bg-white px-2 py-1 text-xs font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                                      onClick={() => arrayHelpersBewerter.remove(index)}
                                      disabled={index === 0}
                                    >
                                      <div className="flex gap-4">
                                        <TrashIcon className="size-6"/>
                                        <div>Bewerter:in löschen</div>
                                      </div>
                                    </button>
                                  </div>
                                )
                                : null
                            }
                          </div>

                          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">

                            <FieldArray
                              name={`bewerter.${index}.kriterien`}
                              render={(arrayHelpersKriterien) => (
                                <div className="col-span-full">

                                  <div className="sm:flex sm:items-center">
                                    <div className="sm:flex-auto">
                                      <h1 className="text-base font-semibold text-gray-900">Bewertungskriterien</h1>
                                    </div>
                                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          arrayHelpersKriterien.push({
                                            text: '',
                                            punkte: '',
                                          })
                                        }
                                        className="inline-flex items-center gap-x-1.5  rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                      >
                                        <PlusIcon aria-hidden="true" className="-ml-0.5 size-5"/>
                                        Kriterium hinzufügen
                                      </button>
                                    </div>
                                  </div>

                                  <table className="min-w-full divide-y divide-gray-300">
                                    <thead>
                                    <tr>
                                      <th scope="col"
                                          className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">Kriterium
                                      </th>
                                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Punkte
                                      </th>
                                      <th scope="col"
                                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Optionen
                                      </th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">

                                    {
                                      bewerter.kriterien.map((kriterium: any, indexKrit: number) => (
                                        <tr key={indexKrit}>
                                          <td
                                            className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8">
                                            <Field
                                              id={`bewerter-${index}-kriterien-text-${indexKrit}`}
                                              name={`bewerter.${index}.kriterien.${indexKrit}.text`}
                                              type="text"
                                              placeholder="Kopf überstrecken"
                                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                                            />
                                          </td>
                                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                            <Field
                                              id={`bewerter-${index}-kriterien-text-${indexKrit}`}
                                              name={`bewerter.${index}.kriterien.${indexKrit}.punkte`}
                                              type="number"
                                              placeholder="10"
                                              min={0}
                                              step={1}
                                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                                            />
                                          </td>
                                          <td className="x-3 py-4 text-sm whitespace-nowrap text-gray-500 text-right">
                                            {
                                              indexKrit > 0
                                                ? (
                                                  <button
                                                    type="button"
                                                    className="rounded-sm bg-white px-2 py-1 text-xs font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                                                    onClick={() => arrayHelpersKriterien.remove(indexKrit)}
                                                    disabled={indexKrit === 0}
                                                  >
                                                    <TrashIcon className="size-6"/>
                                                  </button>
                                                )
                                                : null
                                            }
                                          </td>
                                        </tr>
                                      ))
                                    }
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            />

                            <div className="col-span-full">
                              <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                                Anmerkungen
                              </label>
                              <div className="mt-2">
                                <Field
                                  as="textarea"
                                  id={`bewerter.${index}.additionalNotes`}
                                  name={`bewerter.${index}.additionalNotes`}
                                  rows={3}
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                                />
                              </div>
                              <p className="mt-3 text-sm/6 text-gray-600">Anmerkungen für Bewerter</p>
                            </div>

                          </div>
                        </div>
                      ))
                    }
                  </>
                )}
              />
            </>

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