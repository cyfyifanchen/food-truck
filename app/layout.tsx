import type { Metadata } from 'next'
import { Roboto_Condensed } from 'next/font/google'
import './globals.css'

const roboto = Roboto_Condensed({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Truckee - a food truck service',
  description: 'Your friendly food truck service based in Bay Area.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
