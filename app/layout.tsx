import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Harare, Zimbabwe Routes Map',
  description: 'Developed By Chatunga',
  keywords: ['Harare', 'Zimbabwe', 'Routes Map', 'Chatunga'],
  authors: [{ name: 'Chatunga'}],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
