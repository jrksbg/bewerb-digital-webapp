'use server'

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AuthenticatedLayout({
                                                    children,
                                                  }: Readonly<{
  children: React.ReactNode;
}>) {

  const [ requestHeaders, cookieStore ] = await Promise.all([
    headers(),
    cookies(),
  ])

  if (!cookieStore.has('session-token')) {
    if (requestHeaders.get('x-next-search-parameters')) {
      redirect(`/login?redirect_uri=${encodeURIComponent(requestHeaders.get('x-next-path') + '?' + requestHeaders.get('x-next-search-parameters'))}`);
    }

    if (requestHeaders.get('x-next-path')) {
      redirect(`/login?redirect_uri=${encodeURIComponent(requestHeaders.get('x-next-path')!)}`);
    }

    redirect(`/login`);
  }

  return children
}
