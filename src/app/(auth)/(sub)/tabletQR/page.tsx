import { QRCodeSVG } from 'qrcode.react';
import { cookies } from 'next/headers';

export default async function TabletQRPage() {
  const cookieStore = await cookies()

  const { token } = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tablets/token`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${cookieStore.get('session-token')?.value}`,
      }
    }).then(response => response.json())

  console.log(token)

  return (
    <div>
      <QRCodeSVG value={token} size={256} />,
    </div>
  )
}