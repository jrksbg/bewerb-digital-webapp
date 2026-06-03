'use client'

import NoSSR from '@/utils/NoSSR';
import LoginPageContent from '@/app/login/LoginPageContent';

export default function LoginPage() {
  return (
    <NoSSR>
      <LoginPageContent />
    </NoSSR>
  )
}
