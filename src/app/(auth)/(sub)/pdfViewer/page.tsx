export default async function PDFViewerPage() {
  const url = 'http://localhost:3010/v1/results/zivil/stationen/2/gruppen/2/pdf'

  return (
    <object data={url} type="application/pdf" className="w-full h-[calc(100vh-20vh)]">
      <embed src={url} type="application/pdf"/>
    </object>
  )
}