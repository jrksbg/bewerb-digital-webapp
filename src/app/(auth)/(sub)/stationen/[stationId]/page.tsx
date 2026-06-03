import NewStationForm from '@/app/(auth)/(sub)/stationen/neu/NewStationForm';
import { cookies } from 'next/headers';

export default async function StationDetailsPage({ params }: { params: any }) {
  const cookieStore = await cookies()
  const { stationId } = await params

  const [station, questionCatalogs, praxisstationen] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bewerbstationen/${stationId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${cookieStore.get('session-token')?.value}`,
      }
    }).then(response => response.json()),
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/questionCatalogs`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${cookieStore.get('session-token')?.value}`,
      }
    }).then(response => response.json()),
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/praxisstationen`, {
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
  const editableData = {
    id: station.id,
    stationType: station.type,
    stationName: station.name,
    stationLocation: station.location,
    fragenkatalogJugend1: station.jugend1FragenkatalogId,
    fragenkatalogJugend2: station.jugend2FragenkatalogId,
    fragenkatalogHelfi: station.fragenkatalogHelfiId,
    praxisstationJugend1: station.jugend1PraxisstationId,
    praxisstationJugend2: station.jugend2PraxisstationId,
    praxisstationHelfi: station.helfiPraxisstationId,
  }

  return (
    <div>
      <NewStationForm questionCatalogs={questionCatalogs} praxisstationen={praxisstationen} editableData={editableData} />
    </div>
  )
}