'use server'

import type { Altersklasse } from '@/utils/enums';
import { cookies } from 'next/headers';

export async function createGroup(name: string, jugendgruppe: string, altersklasse: Altersklasse) {
  'use server'

  const cookieStore = await cookies()

  const gruppe = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/gruppen`, {
    method: 'POST',
    body: JSON.stringify({
      name: name,
      jugendgruppe: jugendgruppe,
      altersklasse: altersklasse,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookieStore.get('session-token')?.value}`,
    }
  }).then(response => response.json())

  return gruppe
}
