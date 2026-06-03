import PersonenPageContent from '@/app/(auth)/(sub)/personen/PersonenPageContent.component';
import { cookies } from 'next/headers';

export default async function PersonenPage() {
  const cookieStore = await cookies()

  const bewerbsgruppen = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/gruppen`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${cookieStore.get('session-token')?.value}`,
    }
  }).then(response => response.json())

  return (
    <PersonenPageContent bewerbsgruppen={bewerbsgruppen} />
  )
}