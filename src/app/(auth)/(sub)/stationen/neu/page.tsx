import NewStationForm from '@/app/(auth)/(sub)/stationen/neu/NewStationForm';
import { cookies } from 'next/headers';

export default async function NeueStationPage() {
  const cookieStore = await cookies()

  const questionCatalogs = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/questionCatalogs`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${cookieStore.get('session-token')?.value}`,
    }
  }).then(response => response.json())

  const praxisstationen = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/praxisstationen`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${cookieStore.get('session-token')?.value}`,
    }
  }).then(response => response.json())


  return (
    <NewStationForm questionCatalogs={questionCatalogs} praxisstationen={praxisstationen} />
  )
}