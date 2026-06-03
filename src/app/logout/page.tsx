'use client'

import { useEffect } from 'react';
import { redirect, RedirectType } from 'next/navigation';
import { ThreeDot } from 'react-loading-indicators';
import Cookies from 'js-cookie';

export default function LogoutPage() {

  useEffect(() => {
    Cookies.remove('session-token')
    sessionStorage.removeItem('session-userdata')

    redirect(`/login`, RedirectType.replace)
  }, [])

  return (
    <div className="flex min-h-full flex-col">

      <title>Logout</title>

      <div className="flex-grow flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">
            Abmeldung wird ausgeführt
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <ThreeDot color="rgb(255,0,0)" size="large" />
        </div>
      </div>
    </div>
  )
}