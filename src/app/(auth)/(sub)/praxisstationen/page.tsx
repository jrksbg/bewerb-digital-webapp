import Link from 'next/link';
import { cookies } from 'next/headers';
import { mapStationType } from '@/utils/mapping.utils';

export default async function PraxisstationenPage() {
  const cookieStore = await cookies()

  const stationen = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/praxisstationen`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${cookieStore.get('session-token')?.value}`,
    }
  }).then(response => response.json())

  console.log(stationen)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Vorlagen Praxisstationen</h1>
          <p className="mt-2 text-sm text-gray-700">
            Praxisstationen Vorlagen
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/praxisstationen/neu"
            type="button"
            className="block rounded-md bg-rk-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-rk-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rk-red-600"
          >
            Vorlage hinzufügen
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                >
                  Stationsname
                </th>
                <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-6 lg:pr-8">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
              {stationen.map((station: any) => (
                <tr key={station.id}>
                  <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8">
                    {station.name}
                  </td>
                  <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6 lg:pr-8">
                    <Link href={`/praxisstationen/${station.id}`} className="text-rk-red-600 hover:text-rk-red-900">
                      Anzeigen<span className="sr-only">, {station.name}</span>
                    </Link>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}