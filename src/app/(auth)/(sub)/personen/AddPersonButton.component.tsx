'use client'

import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Field, Form, Formik } from 'formik';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Altersklasse } from '@/utils/enums';
import { createPerson } from '@/app/(auth)/(sub)/personen/Personen.actions';

export default function AddPersonButton({ fetchPersonen, bewerbsgruppen } : { fetchPersonen: any, bewerbsgruppen: any }) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          type="button"
          className="block rounded-md bg-rk-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-rk-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rk-red-600"
          onClick={() => setOpen(true)}
        >
          Personen hinzufügen
        </button>
      </div>
      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Formik
              initialValues={{
                pernr: '',
                bewerbsgruppe: 'UNDEFINED'
              }}
              onSubmit={async ({ pernr, bewerbsgruppe }, { setSubmitting }) => {
                setSubmitting(true)

                const response = await createPerson(+pernr, +bewerbsgruppe)

                fetchPersonen()

                setSubmitting(false)
                setOpen(false)
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
                  resetForm,
                  /* and other goodies */
                }) => (
                <DialogPanel
                  transition
                  className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                >
                  <Form>
                    <div className="sm:flex sm:items-start">
                      <div
                        className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10">
                        <PlusIcon aria-hidden="true" className="size-6 text-blue-600"/>
                      </div>
                      <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                          Teilnehmer:in anlegen
                        </DialogTitle>


                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">

                          <div className="col-span-full">
                            <label htmlFor="pernr" className="block text-sm/6 font-medium text-gray-900">
                              Personalnummer*
                            </label>
                            <div className="mt-2">
                              <Field
                                name="pernr"
                                id="pernr"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                              />
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label htmlFor="bewerbsgruppe" className="block text-sm/6 font-medium text-gray-900">
                              Bewerbsgruppe*
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                              <Field
                                as="select"
                                id="bewerbsgruppe"
                                name="bewerbsgruppe"
                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                              >
                                <option value="UNDEFINED" disabled={true}>Bewerbsgruppe wählen</option>
                                {
                                  bewerbsgruppen.map((bewerbsgruppe: any) => (
                                    <option key={bewerbsgruppe.id} value={bewerbsgruppe.id}>{bewerbsgruppe.name}</option>
                                  ))
                                }
                              </Field>
                              <ChevronDownIcon
                                aria-hidden="true"
                                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                      >
                        Anlegen
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          resetForm()
                          setOpen(false)
                        }}
                        disabled={isSubmitting}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      >
                        Abbrechen
                      </button>
                    </div>
                  </Form>
                </DialogPanel>
              )}
            </Formik>
          </div>
        </div>
      </Dialog>
    </>
  )
}
