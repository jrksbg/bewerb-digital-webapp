import { cookies } from 'next/headers';
import PraxisstationEditForm from '@/app/(auth)/(sub)/praxisstationen/[stationId]/PraxisstationEditForm';

export default async function PraxisstationDetailsPage({ params }: { params: any }) {
  const cookieStore = await cookies()
  const { stationId } = await params

  const [station] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/praxisstationen/${stationId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${cookieStore.get('session-token')?.value}`,
      }
    }).then(response => response.json())
  ])

  console.log(station)

  {
    // MAP StationData
  }
  const stationData = {
    id: station.id,
    name: station.name,
    szenarioBeschreibung: station.szenarioBeschreibung,
    masterfrage: station.masterfrage?.frage,
    masterfrageA1: station.masterfrage?.antwort1,
    masterfrageA2: station.masterfrage?.antwort2,
    masterfrageA3: station.masterfrage?.antwort3,
    masterfragePunkte: station.masterfrage?.punkte,
    bewerter: station.bewerter.map((bewerter: any) => ({
      id: bewerter.id,
      kriterien: bewerter.bewertungskriterien.map((kriterium: any) => ({
        id: kriterium.id,
        text: kriterium.text,
        punkte: kriterium.punkte,
      })),
      additionalNotes: bewerter.additionalNote,
    })),
  }

  return (
    <div>
      <PraxisstationEditForm stationData={stationData}/>
    </div>
  )
}