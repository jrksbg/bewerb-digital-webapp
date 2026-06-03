'use client'

import BewerbDigitalLogo from '@/static_content/images/jrk_bewerb_digital.svg';
import Image from 'next/image';
import LoginForm from '@/app/login/LoginForm';
import { getSessionData } from '@/utils/auth.utils';
import { useParams, useRouter } from 'next/navigation';

export default function LoginPageContent() {
  //const { redirect_uri } = await searchParams
  const { redirect_uri } : { redirect_uri: string } = useParams()
  const router = useRouter()
  const user = getSessionData()

  if (user) {
    router.replace(redirect_uri || '/')
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <title>Login | JRK Bewerb Digital</title>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="JRK Bewerb Digital"
          src={BewerbDigitalLogo}
          height={47}
          width={120}
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Anmelden mit RK-Portal Daten
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm redirect_uri={redirect_uri} />
      </div>
    </div>
  )
}
