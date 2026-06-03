'use client'

import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { XCircleIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginSchema = Yup.object().shape({
  pernr: Yup.string().required('Personalnummer wird benötigt'),
  password: Yup.string().required('Passwort wird benötigt'),
})

export default function LoginForm({ redirect_uri } : { redirect_uri: string }) {
  const router = useRouter()

  return (
    <Formik
      initialValues={{
        pernr: '',
        password: '',
        datenschutz: false,
      }}
      initialStatus={{}}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        setSubmitting(true)
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/signin`, {
            method: 'POST',
            body: JSON.stringify({
              pernr: values.pernr,
              password: values.password,
            }),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          }).then(response => response.json())

          if (response.error) {
            setStatus({
              error: response.message
            })
            return
          } else {
            setStatus({})
          }

          Cookies.set('session-token', response.token, { domain: process.env.NEXT_PUBLIC_COOKIE_URL })
          sessionStorage.setItem('session-userdata', JSON.stringify(response.userdata))
          //Cookies.set('session-userdata', JSON.stringify(response.userdata), { domain: process.env.NEXT_PUBLIC_COOKIE_URL })
          if (redirect_uri) {
            router.push(decodeURIComponent(redirect_uri))
          } else {
            router.push('/')
          }

        } catch (e) {
          console.log(e)
          console.log('ERROR')
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({
          values,
          errors,
          status,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          /* and other goodies */
        }) => (
          <Form className="space-y-6">
            {
              status.error
                ? (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="shrink-0">
                        <XCircleIcon aria-hidden="true" className="size-5 text-red-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Die Anmeldung ist fehlgeschlagen</h3>
                        <div className="mt-2 text-sm text-red-700">
                          <ul role="list " className="space-y-1">
                            <li>{status.error}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )
                : null
            }

            <div>
              <label htmlFor="pernr" className="block text-sm/6 font-medium text-gray-900">
                Personalnummer
              </label>
              <div className="mt-2">
                <Field
                  id="pernr"
                  name="pernr"
                  type="text"
                  autoComplete="username"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                />
                {
                  errors.pernr && touched.pernr
                    ? (<p className="mt-2 text-sm text-red-600">{ errors.pernr }</p>)
                    : null
                }
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Passwort
                </label>
                <div className="text-sm">
                  <a href="https://portal.s.roteskreuz.at/index.php?action=forgotpw" className="font-semibold text-black hover:text-red-500">
                    Passwort vergessen?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <Field
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                />
                {
                  errors.password && touched.password
                    ? (<p className="mt-2 text-sm text-red-600">{ errors.password }</p>)
                    : null
                }
              </div>
            </div>

            <div>
              <div className="flex gap-3">
                <div className="flex h-6 shrink-0 items-center">
                  <div className="group grid size-4 grid-cols-1">
                    <Field
                      type="checkbox"
                      id="datenschutz"
                      name="datenschutz"
                      aria-describedby="datenschutz-description"
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
                </div>
                <div className="text-sm/6">
                  <label htmlFor="datenschutz" className="font-medium text-gray-900">
                    <Link href="DatenschutzinformationBewerbsApp.pdf" className="font-bold">Datenschutzinformation</Link> der Bewerbsapp akzeptiert
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting || ! values.datenschutz}
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs disabled:bg-rk-red-950 hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                {
                  isSubmitting
                    ? 'Bitte warten'
                    : 'Anmelden'
                }
              </button>
            </div>
          </Form>
      )}
    </Formik>
  )
}