'use client'

import { Field, FieldArray, Form, Formik } from 'formik';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { StationType } from '@/utils/enums';
import Cookies from 'js-cookie';
import { mapStationType } from '@/utils/mapping.utils';

export default function NewStationForm({ questionCatalogs, praxisstationen, editableData } : { questionCatalogs: any, praxisstationen: any, editableData?: any }) {
  const router = useRouter()

  const isEdit = !!editableData

  const initialData =
    editableData || {
      stationType: 'UNDEFINED',
      stationName: '',
      stationLocation: '',
      fragenkatalogJugend1: 'UNDEFINED',
      fragenkatalogJugend2: 'UNDEFINED',
      fragenkatalogHelfi: 'UNDEFINED',

      praxisstationJugend1: 'UNDEFINED',
      praxisstationJugend2: 'UNDEFINED',
      praxisstationHelfi: 'UNDEFINED',

      sozialStation: {
        helfi: [{
          bild: '',
          type: 'NICHTS',
          punkte: '',
        }],
        jugend: [{
          begriff: '',
          grundsatz: false,
          punkte: '',
        }]
      },

      zivilcourageStation: {
        helfi: [{
          aussage: '',
          punkte: '',
        }],
        jugend: [{
          begriff: '',
          darstellungsart: 'PANTOMIME',
          punkte: '',
        }]
      }
    }

  return (
    <Formik
      initialValues={initialData}
      onSubmit={async (values, {setSubmitting}) => {
        setSubmitting(true)
        console.log(values)
        const body =
          values.stationType === StationType.THEORY
            ? {
              stationType: values.stationType,
              name: values.stationName,
              location: values.stationLocation,
              fragenkatalogHelfi: +values.fragenkatalogHelfi,
              fragenkatalogJugend1: +values.fragenkatalogJugend1,
              fragenkatalogJugend2: +values.fragenkatalogJugend2,
            }
            : values.stationType === StationType.PRACTICAL
              ? {
                stationType: values.stationType,
                name: values.stationName,
                location: values.stationLocation,
                praxisstationHelfi: +values.praxisstationHelfi,
                praxisstationJugend1: +values.praxisstationJugend1,
                praxisstationJugend2: +values.praxisstationJugend2,
              } : values.stationType === StationType.SOCIAL
                ? {
                  stationType: values.stationType,
                  name: values.stationName,
                  location: values.stationLocation,
                  ... values.sozialStation,
                } : {
                  stationType: values.stationType,
                  name: values.stationName,
                  location: values.stationLocation,
                  ...values.zivilcourageStation,
                }

        const bewerbstation = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bewerbstationen`, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${Cookies.get('session-token')}`,
          }
        }).then(response => response.json())
        console.log(bewerbstation)
        setSubmitting(false)
        router.push(`/stationen`)

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
                  Allgemeine Stationsinformationen für die automatische Verarbeitung
                </p>
              </div>

              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                <div className="col-span-full">
                  <label htmlFor="station-type" className="block text-sm/6 font-medium text-gray-900">
                    Stationstyp
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <Field
                      as="select"
                      id="station-type"
                      name="stationType"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                    >
                      <option value="UNDEFINED" disabled={true}>Stationstyp wählen</option>
                      {
                        Object.values(StationType).map((stationType) => (
                          <option key={stationType} value={stationType}>
                            { mapStationType(stationType) }
                          </option>
                        ))
                      }
                    </Field>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="station-name" className="block text-sm/6 font-medium text-gray-900">
                    Name
                  </label>
                  <div className="mt-2">
                    <Field
                      id="station-name"
                      name="stationName"
                      type="text"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="station-location" className="block text-sm/6 font-medium text-gray-900">
                    Ort
                  </label>
                  <div className="mt-2">
                    <Field
                      id="station-location"
                      name="stationLocation"
                      type="text"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            </div>

            {
              // FORM Praxis
            }
            {
              values.stationType === StationType.PRACTICAL
                ? (
                  <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                      <div>
                        <h2 className="text-base/7 font-semibold text-gray-900">Praxisstationen</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">Vorlage für Praxisstation</p>
                      </div>

                      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">

                        <div className="col-span-full">
                          <label htmlFor="praxisstation-helfi" className="block text-sm/6 font-medium text-gray-900">
                            Stationsvorlage für Helfi
                          </label>
                          <div className="mt-2 grid grid-cols-1">
                            <Field
                              as="select"
                              id="praxisstation-helfi"
                              name="praxisstationHelfi"
                              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                            >
                              <option value="UNDEFINED" disabled={true}>Praxis Vorlage wählen</option>
                              {
                                praxisstationen.map((praxisstation: any) => (
                                  <option value={praxisstation.id} key={praxisstation.id}>{praxisstation.name}</option>
                                ))
                              }
                            </Field>
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label htmlFor="praxisstation-jugend1" className="block text-sm/6 font-medium text-gray-900">
                            Stationsvorlage für Jugend 1
                          </label>
                          <div className="mt-2 grid grid-cols-1">
                            <Field
                              as="select"
                              id="praxisstation-jugend1"
                              name="praxisstationJugend1"
                              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                            >
                              <option value="UNDEFINED" disabled={true}>Praxis Vorlage wählen</option>
                              {
                                praxisstationen.map((praxisstation: any) => (
                                  <option value={praxisstation.id} key={praxisstation.id}>{praxisstation.name}</option>
                                ))
                              }
                            </Field>
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label htmlFor="praxisstation-jugend2" className="block text-sm/6 font-medium text-gray-900">
                            Praxis Vorlage für Jugend 2
                          </label>
                          <div className="mt-2 grid grid-cols-1">
                            <Field
                              as="select"
                              id="praxisstation-jugend2"
                              name="praxisstationJugend2"
                              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                            >
                              <option value="UNDEFINED" disabled={true}>Praxis Vorlage wählen</option>
                              {
                                praxisstationen.map((praxisstation: any) => (
                                  <option value={praxisstation.id} key={praxisstation.id}>{praxisstation.name}</option>
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
                )
                : null
            }

            {
              // FORM Theorie
            }
            {
              values.stationType === StationType.THEORY
                ? (
                  <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                    <div>
                      <h2 className="text-base/7 font-semibold text-gray-900">Fragenkataloge</h2>
                      <p className="mt-1 text-sm/6 text-gray-600">Fragenkatalog für Theoriestation</p>
                    </div>

                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">

                      <div className="col-span-full">
                        <label htmlFor="fragenkatalog-helfi" className="block text-sm/6 font-medium text-gray-900">
                          Fragenkatalog für Helfi
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                          <Field
                            as="select"
                            id="fragenkatalog-helfi"
                            name="fragenkatalogHelfi"
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                          >
                            <option value="UNDEFINED" disabled={true}>Fragenkatalog wählen</option>
                            {
                              questionCatalogs.map((questionCatalog: any) => (
                                <option value={questionCatalog.id} key={questionCatalog.id}>{questionCatalog.name}</option>
                              ))
                            }
                          </Field>
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label htmlFor="fragenkatalog-jugend1" className="block text-sm/6 font-medium text-gray-900">
                          Fragenkatalog für Jugend 1
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                          <Field
                            as="select"
                            id="fragenkatalog-jugend1"
                            name="fragenkatalogJugend1"
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                          >
                            <option value="UNDEFINED" disabled={true}>Fragenkatalog wählen</option>
                            {
                              questionCatalogs.map((questionCatalog: any) => (
                                <option value={questionCatalog.id} key={questionCatalog.id}>{questionCatalog.name}</option>
                              ))
                            }
                          </Field>
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label htmlFor="fragenkatalog-jugend2" className="block text-sm/6 font-medium text-gray-900">
                          Fragenkatalog für Jugend 2
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                          <Field
                            as="select"
                            id="fragenkatalog-jugend2"
                            name="fragenkatalogJugend2"
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                          >
                            <option value="UNDEFINED" disabled={true}>Fragenkatalog wählen</option>
                            {
                              questionCatalogs.map((questionCatalog: any) => (
                                <option value={questionCatalog.id} key={questionCatalog.id}>{questionCatalog.name}</option>
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
                )
                : null
            }

            {
              values.stationType === StationType.SOCIAL
                ? (
                  <>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                      <div>
                        <h2 className="text-base/7 font-semibold text-gray-900">Helfi-Runden</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">Spielrunden für Helfis</p>
                      </div>

                      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">

                        <FieldArray
                          name="sozialStation.helfi"
                          render={(arrayHelpersRunden) => (
                            <div className="col-span-full">

                              <div className="sm:flex sm:items-center">
                                <div className="sm:flex-auto">
                                  <h1 className="text-base font-semibold text-gray-900">Runden</h1>
                                </div>
                                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      arrayHelpersRunden.push({
                                        bild: '',
                                        type: 'NICHTS',
                                        punkte: '',
                                      })
                                    }
                                    className="inline-flex items-center gap-x-1.5  rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                  >
                                    <PlusIcon aria-hidden="true" className="-ml-0.5 size-5"/>
                                    Runde hinzufügen
                                  </button>
                                </div>
                              </div>

                              <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                <tr>
                                  <th scope="col"
                                      className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">Begriff
                                  </th>
                                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Einordnung
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
                                  values.sozialStation.helfi.map((kriterium: any, index: number) => (
                                    <tr key={index}>
                                      <td
                                        className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8">
                                        <Field
                                          id={`sozialStation-helfi-${index}-bild`}
                                          name={`sozialStation.helfi.${index}.bild`}
                                          type="text"
                                          placeholder="Kopf überstrecken"
                                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                                        />
                                      </td>
                                      <td
                                        className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8">

                                        <div className="col-span-full">
                                          <div className="grid grid-cols-1">
                                            <Field
                                              as="select"
                                              id={`sozialStation-helfi-${index}-type`}
                                              name={`sozialStation.helfi.${index}.type`}
                                              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                                            >
                                              <option value="UNDEFINED" disabled={true}>Einordnung wählen</option>
                                              <option value="NICHTS">Nichts</option>
                                              <option value="LEITBILD">Leitbild</option>
                                              <option value="GRUNDSATZ">Grundsatz</option>
                                            </Field>
                                            <ChevronDownIcon
                                              aria-hidden="true"
                                              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                            />
                                          </div>
                                        </div>
                                      </td>
                                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                        <Field
                                          id={`sozialStation-helfi-${index}-punkte`}
                                          name={`sozialStation.helfi.${index}.punkte`}
                                          type="number"
                                          placeholder="10"
                                          min={0}
                                          step={1}
                                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                                        />
                                      </td>
                                      <td className="x-3 py-4 text-sm whitespace-nowrap text-gray-500 text-right">
                                        {
                                          index > 0
                                            ? (
                                              <button
                                                type="button"
                                                className="rounded-sm bg-white px-2 py-1 text-xs font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                                                onClick={() => arrayHelpersRunden.remove(index)}
                                                disabled={index === 0}
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
                          )} />

                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                      <div>
                        <h2 className="text-base/7 font-semibold text-gray-900">Jugend-Runden</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">Spielrunden für Jugend1 und Jugend2</p>
                      </div>

                      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">

                        <FieldArray
                          name="sozialStation.jugend"
                          render={(arrayHelpersRunden) => (
                            <div className="col-span-full">

                              <div className="sm:flex sm:items-center">
                                <div className="sm:flex-auto">
                                  <h1 className="text-base font-semibold text-gray-900">Runden</h1>
                                </div>
                                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      arrayHelpersRunden.push({
                                        begriff: '',
                                        grundsatz: false,
                                        punkte: '',
                                      })
                                    }
                                    className="inline-flex items-center gap-x-1.5  rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                  >
                                    <PlusIcon aria-hidden="true" className="-ml-0.5 size-5"/>
                                    Runde hinzufügen
                                  </button>
                                </div>
                              </div>

                              <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                <tr>
                                  <th scope="col"
                                      className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">Begriff
                                  </th>
                                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Grundsatz
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
                                  values.sozialStation.jugend.map((jugendRunde: any, index: number) => (
                                    <tr key={index}>
                                      <td
                                        className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8">
                                        <Field
                                          id={`sozialStation-jugend-${index}-begriff`}
                                          name={`sozialStation.jugend.${index}.begriff`}
                                          type="text"
                                          placeholder="Kopf überstrecken"
                                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                                        />
                                      </td>
                                      <td
                                        className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8">

                                        <div className="col-span-full">
                                          <div className="group grid size-4 grid-cols-1">
                                          <Field
                                            id={`sozialStation-jugend-${index}-grundsatz`}
                                            name={`sozialStation.jugend.${index}.grundsatz`}
                                            type="checkbox"
                                            aria-describedby="comments-description"
                                            className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-rk-red checked:bg-rk-red indeterminate:border-rk-red indeterminate:bg-rk-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rk-red disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                          />
                                          <svg
                                            fill="none"
                                            viewBox="0 0 14 14"
                                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                          >
                                            <path
                                              d="M3 8L6 11L11 3.5"
                                              strokeWidth={2}
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="opacity-0 group-has-checked:opacity-100"
                                            />
                                            <path
                                              d="M3 7H11"
                                              strokeWidth={2}
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="opacity-0 group-has-indeterminate:opacity-100"
                                            />
                                          </svg>
                                        </div>
                                          {
                                            /*
                                            <div className="grid grid-cols-1">
                                            <Field
                                              as="select"
                                              id={`sozialStation-jugend-${index}-istGrundsatz`}
                                              name={`sozialStation.jugend.${index}.istGrundsatz`}
                                              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                                            >
                                              <option value="false">Nein</option>
                                              <option value="true">Ja</option>
                                            </Field>
                                            <ChevronDownIcon
                                              aria-hidden="true"
                                              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                            />
                                          </div>
                                             */
                                          }
                                        </div>
                                      </td>
                                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                        <Field
                                          id={`sozialStation-jugend-${index}-punkte`}
                                          name={`sozialStation.jugend.${index}.punkte`}
                                          type="number"
                                          placeholder="10"
                                          min={0}
                                          step={1}
                                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                                        />
                                      </td>
                                      <td className="x-3 py-4 text-sm whitespace-nowrap text-gray-500 text-right">
                                        {
                                          index > 0
                                            ? (
                                              <button
                                                type="button"
                                                className="rounded-sm bg-white px-2 py-1 text-xs font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                                                onClick={() => arrayHelpersRunden.remove(index)}
                                                disabled={index === 0}
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
                          )} />

                      </div>
                    </div>
                  </>
                )
                : null
            }

            {
              values.stationType === StationType.ZIVILCOURAGE
                ? (
                  <>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                      <div>
                        <h2 className="text-base/7 font-semibold text-gray-900">Helfi-Runden</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">Spielrunden für Helfis</p>
                      </div>

                      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">

                        <FieldArray
                          name="zivilcourageStation.helfi"
                          render={(arrayHelpersRunden) => (
                            <div className="col-span-full">

                              <div className="sm:flex sm:items-center">
                                <div className="sm:flex-auto">
                                  <h1 className="text-base font-semibold text-gray-900">Runden</h1>
                                </div>
                                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      arrayHelpersRunden.push({
                                        aussage: '',
                                        punkte: '',
                                      })
                                    }
                                    className="inline-flex items-center gap-x-1.5  rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                  >
                                    <PlusIcon aria-hidden="true" className="-ml-0.5 size-5"/>
                                    Runde hinzufügen
                                  </button>
                                </div>
                              </div>

                              <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                <tr>
                                  <th scope="col"
                                      className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">Begriff
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
                                  values.zivilcourageStation.helfi.map((helfiRunde: any, index: number) => (
                                    <tr key={index}>
                                      <td
                                        className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8">
                                        <Field
                                          id={`zivilcourageStation-helfi-${index}-aussage`}
                                          name={`zivilcourageStation.helfi.${index}.aussage`}
                                          type="text"
                                          placeholder="Kopf überstrecken"
                                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                                        />
                                      </td>
                                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                        <Field
                                          id={`zivilcourageStation-helfi-${index}-punkte`}
                                          name={`zivilcourageStation.helfi.${index}.punkte`}
                                          type="number"
                                          placeholder="10"
                                          min={0}
                                          step={1}
                                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                                        />
                                      </td>
                                      <td className="x-3 py-4 text-sm whitespace-nowrap text-gray-500 text-right">
                                        {
                                          index > 0
                                            ? (
                                              <button
                                                type="button"
                                                className="rounded-sm bg-white px-2 py-1 text-xs font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                                                onClick={() => arrayHelpersRunden.remove(index)}
                                                disabled={index === 0}
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
                          )} />

                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                      <div>
                        <h2 className="text-base/7 font-semibold text-gray-900">Jugend-Runden</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">Spielrunden für Hugnd1 und Jugend2</p>
                      </div>

                      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">

                        <FieldArray
                          name="zivilcourageStation.jugend"
                          render={(arrayHelpersRunden) => (
                            <div className="col-span-full">

                              <div className="sm:flex sm:items-center">
                                <div className="sm:flex-auto">
                                  <h1 className="text-base font-semibold text-gray-900">Runden</h1>
                                </div>
                                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      arrayHelpersRunden.push({
                                        begriff: '',
                                        darstellungsart: 'PANTOMIME',
                                        punkte: '',
                                      })
                                    }
                                    className="inline-flex items-center gap-x-1.5  rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                  >
                                    <PlusIcon aria-hidden="true" className="-ml-0.5 size-5"/>
                                    Runde hinzufügen
                                  </button>
                                </div>
                              </div>

                              <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                <tr>
                                  <th scope="col"
                                      className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">Begriff
                                  </th>
                                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Darstellungsart
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
                                  values.zivilcourageStation.jugend.map((kriterium: any, index: number) => (
                                    <tr key={index}>
                                      <td
                                        className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8">
                                        <Field
                                          id={`zivilcourageStation-jugend-${index}-begriff`}
                                          name={`zivilcourageStation.jugend.${index}.begriff`}
                                          type="text"
                                          placeholder="Kopf überstrecken"
                                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                                        />
                                      </td>
                                      <td
                                        className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8">

                                        <div className="col-span-full">
                                          <div className="grid grid-cols-1">
                                            <Field
                                              as="select"
                                              id={`zivilcourageStation-jugend-${index}-darstellungsart`}
                                              name={`zivilcourageStation.jugend.${index}.darstellungsart`}
                                              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                                            >
                                              <option value="UNDEFINED" disabled={true}>Darstellungsart wählen</option>
                                              <option value="PANTOMIME">Pantomime</option>
                                              <option value="DRAW">Zeichnen</option>
                                            </Field>
                                            <ChevronDownIcon
                                              aria-hidden="true"
                                              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                            />
                                          </div>
                                        </div>
                                      </td>
                                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                        <Field
                                          id={`zivilcourageStation-jugend-${index}-punkte`}
                                          name={`zivilcourageStation.jugend.${index}.punkte`}
                                          type="number"
                                          placeholder="10"
                                          min={0}
                                          step={1}
                                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                                        />
                                      </td>
                                      <td className="x-3 py-4 text-sm whitespace-nowrap text-gray-500 text-right">
                                        {
                                          index > 0
                                            ? (
                                              <button
                                                type="button"
                                                className="rounded-sm bg-white px-2 py-1 text-xs font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                                                onClick={() => arrayHelpersRunden.remove(index)}
                                                disabled={index === 0}
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
                          )} />

                      </div>
                    </div>
                  </>
                )
                : null
            }
          </div>

          {
            !isEdit
              ? (
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
              )
              : null
          }
        </Form>
      )}
    </Formik>
  )
}
