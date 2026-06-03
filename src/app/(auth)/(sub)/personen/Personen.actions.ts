'use server'

import { cookies } from 'next/headers';

export async function createPerson(pernr: number, bewerbsteamId: number) {
  'use server'

  const cookieStore = await cookies()

  const person = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/personen`, {
    method: 'POST',
    body: JSON.stringify({
      pernr: pernr,
      bewerbsteamId: bewerbsteamId,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookieStore.get('session-token')?.value}`,
    }
  }).then(response => response.json())

  return person
}
