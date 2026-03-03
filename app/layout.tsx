import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Soul Is Mine',
  description: 'A soul catalog by Shang Tsung',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
