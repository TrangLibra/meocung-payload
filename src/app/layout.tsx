export const metadata = {
  title: 'Mèo Cưng Payload CMS',
  description: 'PayloadCMS 3.0 Headless Engine for Meo Cung',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
